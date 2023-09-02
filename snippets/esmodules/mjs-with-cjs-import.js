---
  filename: module.mjs
---
import { merge } from "lodash";

export default function addPi(target) {
  return merge(target, { pi: 3.14 });
}
