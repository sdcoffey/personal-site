---
filename: module.cjs
---

const merge = require("lodash").merge;

function addPi(target) {
  return merge(target, { pi: 3.14 });
}

module.exports = addPi;
