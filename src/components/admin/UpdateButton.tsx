'use client';

type Props = {
    id: Number;
    content: string;
}

export default function UpdateButton({ id, content }: Props) {
    return <button onClick={() => {
        fetch('/api/posts/update', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                content: content,
                // image: 'https://images.unsplash.com/photo-1503266980949-bd30d04d0b7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }}>Update Post</button>;
}