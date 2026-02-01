import fs from "node:fs";
import path from "node:path";
import url from "node:url";

function isRoot(currentPath: string): boolean {
  return fs.readdirSync(currentPath).includes("package.json");
}

export function projectRootPath(): string {
  let currentDir = path.resolve(url.fileURLToPath(import.meta.url), "..");
  while (!isRoot(currentDir)) {
    currentDir = path.resolve(currentDir, "..");
  }

  return currentDir;
}

export function joinToProjectRoot(...parts: string[]): string {
  return path.join(projectRootPath(), ...parts);
}
