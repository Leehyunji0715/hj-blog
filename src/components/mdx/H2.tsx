import React from "react"
import { getAnchor } from "@/util/mdx";

type Props = {};

export default function H2({ children }: { children?: React.ReactNode }) {
  let value = children;
  if (Array.isArray(children)) {
    value = children[0];
  }
  const anchor = getAnchor(value as string ?? '');
  const link = `#${anchor}`;

  return <h2 className="mdx-h2">
    <a href={link} className="anchor-link">
        §
    </a>
    {children}
  </h2>
}