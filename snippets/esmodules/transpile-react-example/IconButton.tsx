import cx from "clsx";
import { VNode } from "preact";

type Props = {
  class?: string;
  Icon: VNode;
  onClick: () => void;
};

export default function IconButton(props: Props): VNode {
  return (
    <button
      onClick={props.onClick}
      class={cx(
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-slate-400 hover:shadow",
        props.class
      )}
    >
      {props.Icon}
    </button>
  );
}