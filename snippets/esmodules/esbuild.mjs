---
filename: esbuild.mjs
language: javascript
copyable: true
---

import * as esbuild from 'esbuild'
import { glob } from "glob";

(async () => {
  // Ignore all test files
  const ignore = {
    ignored: (p) => /^.*\.test\.tsx?$/.test(p.name),
  }

  let entryPoints = await glob("./app/javascript/**/*.*", {
    ignore
  });

  // also transpile any js associated with a ViewComponent
  entryPoints = entryPoints.concat(await glob("./app/components/**/*.ts", { ignore }));

  const buildContext = await esbuild.build({
    entryPoints,
    bundle: false,
    format: "esm", // 👈 this is the key config
    outdir: "app/assets/builds", // sprockets will pick up transpiled assets from here
    publicPath: "assets",
    loader: {
      ".svg": "dataurl",
    },
  });
})();
