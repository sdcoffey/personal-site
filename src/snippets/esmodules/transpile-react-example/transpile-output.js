---
filename: "transpiles to:"
language: 'js'
---
import { jsx } from "preact/jsx-runtime";
import cx from "clsx";
function IconButton(props) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: props.onClick,
      class: cx(
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 hover:shadow",
        props.class
      ),
      children: props.Icon
    }
  );
}
export {
  IconButton as default
};
