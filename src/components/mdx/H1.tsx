import { getAnchor } from "@/util/mdx";
import React from "react"

export default function H1({ children }: { children?: React.ReactNode }) {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;

  return <h1 id={anchor} className="mdx-h1">
    <a href={link} className="anchor-link">
        §
    </a>
    {children}
  </h1>
}