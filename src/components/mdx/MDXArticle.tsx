'use client'

import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";
import H1 from "./H1";
import H2 from "./H2";
import P from "./P";
import Chip from "../Chip";
import Ul from "./Ul";
import H3 from "./H3";


type Props = {
    content: MDXRemoteProps;
};

export default function MDXArticle({content}: Props) {
    return <article className="mdx">
        <MDXRemote
            {...content}
            components={{
                h1: H1,
                h2: H2,
                h3: H3,
                p: P,
                ul: Ul,
                Image: Image,
                Chip: Chip,
            }}
        />
    </article>
}