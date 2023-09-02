---
filename: esbuild
bash: esbuild --bundle module.js
---
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) =>
    function __require() {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };

  // math.js
  var require_math = __commonJS({
    "math.js"(exports, module) {
      function add2(a, b) {
        return a + b;
      }
      function subtract2(a, b) {
        return a - b;
      }
      module.exports = { add: add2, subtract: subtract2 };
    },
  });

  // module.js
  var { add, subtract } = require_math();
  console.log(add(1, 2));
  console.log(subtract(1, 2));
})();
