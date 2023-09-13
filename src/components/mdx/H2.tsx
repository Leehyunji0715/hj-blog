import React from "react"
import { getAnchor } from "@/util/mdx";

type Props = {};

export default function H2({ children }: { children?: React.ReactNode }) {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;

  return <h2 className="mdx-h2">
    <a href={link} className="anchor-link">
        §
    </a>
    {children}
  </h2>
}