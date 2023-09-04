import { Post } from "@prisma/client";
import PostCard from "./PostCard";

type Props = {
    posts: Post[]
};

export default function GridPostList({ posts }: Props) {
    return <div className="grid-list">
        { posts.map(post => <PostCard post={post}/>) }
    </div>;
}