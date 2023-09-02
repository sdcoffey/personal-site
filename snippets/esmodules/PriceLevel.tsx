import type { VNode } from 'preact';

/**
 * 'utilities/dollarsigns' is a local module referenced
 * with a non-relative path.
 * We need to tell typescript how to resolve this non-relative path
 */
import dollarSigns from "utilities/dollarsigns";

export default function PriceLevel(props: { count: number }): VNode {
  return (
    <p>Price: {dollarSigns(count)}</p>
  );
}