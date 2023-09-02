import path from 'path';
import url from 'url'

export function projectRootPath(): string {
  return path.resolve(url.fileURLToPath(import.meta.url), '..', '..', '..');
}

export function joinToProjectRoot(...parts: string[]): string {
  return path.join(projectRootPath(), ...parts);
}
