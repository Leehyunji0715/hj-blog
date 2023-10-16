'use client';
import { FormEvent, useState } from 'react';
import MDXEditor from '@/components/mdx/MDXEditor';
import { $Enums } from '@prisma/client';
import Button from '@/components/Button';
import ImageDragDrop from '@/components/ImageDragDrop';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

export default function BlogAddPage() {
    const session = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(
        `--- 
title: Enter Title
date: yyyy-mm-dd
description: Enter description
meta:
  keywords:
    - javascript
    - react
bannerCloudinaryId: unsplash/photo-1504006833117-8886a355efbf
bannerCredit: Photo by [Geran de Klerk](https://unsplash.com/photos/bKhETeDV1WM)
--- \n
** Hello world! 
* H
        `);
    const [category, setCategory] = useState<$Enums.Category>($Enums.Category.GENERAL);
    const [imageURL, setImageURL] = useState<string>("");
    const [image, setImage] = useState<File>();
    const router = useRouter();
    
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title || !category || !content) {
            alert("TODO: ERROR!")
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('content', content);
        formData.append('imageURL', imageURL ?? '');
        formData.append('imageFile', image ?? '');
        
        fetch('/api/posts/add', {
            method: 'POST',
            body: formData
        })
        .then(() => {
            router.push('/blog/all/1')
        })
    };

    
    if (!session.data?.user || session.data?.user.role !== $Enums.Role.ADMIN) {
        return <div>Invalid Access</div>;
    }

    return <form className='add-form' onSubmit={onSubmit}>
        <input type='text' placeholder='Enter title...' value={title} required onChange={(e) => setTitle(e.target.value)}/>
        <select value={category} onChange={(e) => setCategory(e.target.value as $Enums.Category)}>
            <option value={$Enums.Category.GENERAL}>General</option>
            <option value={$Enums.Category.PROJECT}>Project</option>
            <option value={$Enums.Category.STUDY}>Study</option>
        </select>
        <input type='text' placeholder='Enter Image URL...' value={imageURL} onChange={(e) => setImageURL(e.target.value)} disabled={!!image}/>
        <ImageDragDrop onChangeImage={setImage} disabled={imageURL ? true : false}/>
        <MDXEditor content={content} onChange={setContent}/>
        <Button text="Add Post" className='mt-md w-100'/>
    </form>
}