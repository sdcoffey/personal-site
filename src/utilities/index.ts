import fs from "fs";
import path from "path";
import url from "url";

function isRoot(path: string): boolean {
  return fs.readdirSync(path).includes("package.json");
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

export function id(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
