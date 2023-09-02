---
filename: esbuild
bash: esbuild --bundle --loader:.svg=dataurl --jsx=automatic react.jsx
---
var plus_default =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">%0A  <path d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />%0A</svg>%0A';

// react.jsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
function Counter() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
      src: plus_default,
    }),
  });
}
