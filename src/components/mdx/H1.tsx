import { getAnchor } from "@/util/mdx";
import React from "react"

export default function H1({ children }: { children?: React.ReactNode }) {
  let value = children;
  if (Array.isArray(children)) {
    value = children[0];
  }
  const anchor = getAnchor(value as string ?? '');
  const link = `#${anchor}`;

  return <h1 id={anchor} className="mdx-h1">
    <a href={link} className="anchor-link">
        §
    </a>
    {children}
  </h1>
}