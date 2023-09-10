import Link from "next/link";
import { Post } from "@prisma/client";
import PostCard from "./PostCard";

type Props = {
    posts: Post[]
};

export default function GridPostList({ posts }: Props) {
    return <div className="grid-list mb-lg">
        { posts.map(post => (
            <Link key={post.id} href={`/blog/post/${post.id}`}>
                <PostCard key={post.id} post={post}/>
            </Link>)) 
        }
    </div>;
}