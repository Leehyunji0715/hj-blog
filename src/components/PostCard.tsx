import { Post } from "@prisma/client"
import Image from "next/image";

type Props = {
    post: Post;
}

export default function PostCard({ post }: Props) {
    const imageSrc = post.image ?? '/default_post_img.jpg';
    return <div className="card" style={{ position: 'relative' }}>
        <Image 
            src={imageSrc} 
            width={200}
            height={300}
            alt={`image of ${post.title}`}
            className="card-img"
        />
        <div className="card-info">
            <time>{post.createdAt.toLocaleDateString()}</time>
            <h3>{post.title}</h3>
            <span>{post.category}</span>
        </div>
    </div>
}