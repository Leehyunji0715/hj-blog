'use client'

import * as React from 'react'
import {getMDXComponent} from 'mdx-bundler/client'
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import P from './P';
import Ul from './Ul';
import Chip from '../Chip';
import Pre from './Pre';


type Props = {
    code: string;
};

export default function MDXArticle({code}: Props) {
    const Component = React.useMemo(() => getMDXComponent(code ?? ''), [code]);
    return <article className="mdx">
        <Component 
            components={{
                h1: H1,
                h2: H2,
                h3: H3,
                p: P,
                ul: Ul,
                pre: Pre,
                // Image: Image,
                Chip: Chip,
            }}
        />
    </article>
}