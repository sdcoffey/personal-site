---
filename: bash-product
bash: cat $(find . -name "*.js" | grep -v "bundle") | esbuild --bundle --minify > bundle.js
---

console.log("Hello, world");
