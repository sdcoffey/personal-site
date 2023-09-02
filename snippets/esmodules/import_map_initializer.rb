---
filename: config/initializers/import_map.rb
---

# frozen_string_literal: true

require_relative '../../app/lib/import_map'

ImportMap.configure do |map|
  # "import" is an external dependency
  map.import '@hotwired/stimulus'
  map.import '@hotwired/turbo-rails'
  map.import 'preact', include_subpackages: true
  map.import 'framer-motion', alias: 'react:preact/compat'
  map.import 'dayjs', include_subpackages: true

  # "module" is a local module
  map.module 'dayjs-init'

  # "mount_directory" adds all modules from a given dir, optionally recursive
  map.mount_directory 'controllers'
end

# This will translate to something like:
=begin
{
  "imports": {
    "@hotwired/stimulus": "https://esm.sh/@hotwired/stimulus@^3.2.2?",
    "@hotwired/turbo-rails": "https://esm.sh/@hotwired/turbo-rails@^7.3.0?",
    "preact": "https://esm.sh/preact@^10.15.0?",
    "preact/": "https://esm.sh/preact@^10.15.0&/",
    "framer-motion": "https://esm.sh/framer-motion@^10.12.18?alias=react%3Apreact%2Fcompat",
    "dayjs": "https://esm.sh/dayjs@^1.11.9?",
    "dayjs/": "https://esm.sh/dayjs@^1.11.9&/",
    "dayjs-init": "/assets/javascript/dayjs-init-ec6c761b40bf461c97802604889b78483fba390ed83fcb83392ec41c42335cd7.js",
    "controllers/video-animator": "/assets/javascript/controllers/video-animator-4ad13c3a74253bc208a6d3ec79d8c3d65817f3ecd1de9759f18945c6d413c882.js"
  }
}
=end
