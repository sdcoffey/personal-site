---
filename: module.mjs
---

import _ from "https://esm.sh/lodash@4.17.21";

export default function addPi(target) {
  return _.merge(target, { pi: 3.14 });
}
