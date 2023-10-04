'use client';

import React from 'react'
import { useState } from "react";
import UpdateButton from "./UpdateButton";
import MDXEditor from '../mdx/MDXEditor';


type Props = {
    id: number;
    image: string;
    content: string;
}


export default function UpdatePost({ id, image, content }: Props) {
    const [value, setValue] = useState(content);

    return <>
        <img src={image ?? ''} width={300} />
        <UpdateButton id={id} content={value}/>
        <MDXEditor content={value} onChange={setValue}/>
    </>;
}