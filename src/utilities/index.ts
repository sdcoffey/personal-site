import path from 'path';
import fs from 'fs';
import url from 'url'

function isRoot(path: string): boolean {
  return fs.readdirSync(path).includes('package.json');
}

export function projectRootPath(): string {
  let currentDir = path.resolve(url.fileURLToPath(import.meta.url), '..');
  while (!isRoot(currentDir)) {
    currentDir = path.resolve(currentDir, '..');
  }

  return currentDir;
}

export function joinToProjectRoot(...parts: string[]): string {
  return path.join(projectRootPath(), ...parts);
}
