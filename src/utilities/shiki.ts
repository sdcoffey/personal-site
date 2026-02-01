import { createShikiHighlighter, type ShikiHighlighter } from "@astrojs/markdown-remark";

let cachedHighlighter: Promise<ShikiHighlighter> | null = null;

export function getShikiHighlighter(): Promise<ShikiHighlighter> {
  if (!cachedHighlighter) {
    cachedHighlighter = createShikiHighlighter({ theme: "github-dark" });
  }

  return cachedHighlighter;
}
