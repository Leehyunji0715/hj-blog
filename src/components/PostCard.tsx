// import { Post } from "@prisma/client"
import Image from "next/image";
import { CalendarIcon } from "./icons";
import CategorySmallTag from "./CategorySmallTag";
import { getCategoryColor } from "@/util/color";
import { getImageSrcFrom } from "@/util/image";
import { Post } from "@/service/posts";
import { $Enums } from "@prisma/client";

type Props = {
    post: Post;
}

export default function PostCard({ post }: Props) {
    return <div data-color={getCategoryColor(post.category)} className="card" style={{ position: 'relative' }}>
        <Image 
            src={'/default_post_img.jpg' /*getImageSrcFrom(post)*/}
            width={400}
            height={400}
            alt={`image of ${post.title}`}
            className="card-img"
        />
        <div className="card-info">
            <h3 className="card-info__title">{post.title}</h3>
            <div className="card-info__meta">
                <CategorySmallTag category={post.category as $Enums.Category}/>
                <time>
                    <CalendarIcon/>
                    {new Date(post.date).toLocaleDateString()}
                </time>
            </div>
        </div>
    </div>
}