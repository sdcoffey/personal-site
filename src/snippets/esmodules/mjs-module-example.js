---
filename: module.mjs
---

import { merge } from "https://esm.sh/lodash@4.17.21";

export default function addPi(target) {
  return merge(target, { pi: 3.14 });
}
