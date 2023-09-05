import { Post } from "@prisma/client"
import Image from "next/image";
import { CalendarIcon } from "./icons";
import Chip from "./Chip";

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
            <h3 className="card-info__title">{post.title}</h3>
            <div className="card-info__meta">
                <Chip text={`# ${post.category}`} size="xSmall" round/>
                <time>
                    <CalendarIcon/>
                    {new Date(post.createdAt).toLocaleDateString()}
                </time>
            </div>
        </div>
    </div>
}