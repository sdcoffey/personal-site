---
filename: app/lib/import_map.rb
copyable: true
class: "scrollable-code"
---
class ImportMap
  class Configuration
    def initialize
      @imports = []
      @modules = Set.new
    end

    def import(name, **options)
      dep_alias, include_subpackages = options.values_at(:alias, :include_subpackages)

      version = package_version(name)
      @imports << { name:, version:, remote: remote_specifier(name, version, dep_alias:) }

      return unless include_subpackages

      slash_name = "#{name}/"
      @imports << { name: slash_name, version:, remote: remote_specifier(name, version, dep_alias:, slash: true) }
    end

    def module(name)
      @modules.add(name)
    end

    def mount_directory(folder, recursive: false)
      root_path = Rails.root.join('app/javascript', folder)
      globbable = Rails.root.join("#{root_path}/*.{ts,tsx}").to_s
      globbable = Rails.root.join("#{root_path}/**/*.{ts,tsx}").to_s if recursive

      Rails.root.glob(globbable).map(&:to_s).each do |path|
        next if path.include?('.test')

        relative_to_root = Pathname.new(path).relative_path_from(root_path).dirname
        joinable = [folder, relative_to_root, File.basename(path, File.extname(path))].reject { _1.to_s == '.' }
        module_name = File.join(*joinable)
        @modules << module_name
      end
    end

    attr_reader :imports, :modules

    private

    def package_version(package)
      package_path = Rails.root.join('package.json')
      package_dependencies = JSON.parse(package_path.read)['dependencies']

      raise "Package #{package} not found in #{package_path}" unless package_dependencies.key?(package)

      package_dependencies[package]
    end

    def remote_specifier(name, version, slash: false, dep_alias: nil)
      base = "https://esm.sh/#{name}@#{version}"

      query = { alias: dep_alias }.compact

      return "#{base}&#{query.to_query}/" if slash

      "#{base}?#{query.to_query}"
    end
  end

  class << self
    def config
      @config ||= Configuration.new
    end

    def configure
      yield config
    end

    def to_json(*_args)
      all_imports = config.imports.to_h { [_1[:name], _1[:remote]] }
      all_components = config.modules.index_with do |mod|
        module_specifier(mod)
      end

      JSON.pretty_generate({ imports: { **all_imports, **all_components } })
    end

    def module_specifier(name)
      return "/assets/javascript/#{name}.js" unless Rails.env.production?

      ActionController::Base.helpers.javascript_path("javascript/#{name}")
    end
  end
end
