import PostCard from "./PostCard";
import { Post } from "@/service/posts";

type Props = {
    posts: Post[]
};

export default function GridPostList({ posts }: Props) {
    if (!posts || posts.length == 0) {
        return "No Post";
    }
    return <div className="grid-list mb-lg">
        { posts.map((post, i) => <PostCard key={post.path} post={post} priority={i<6}/>) }
    </div>;
}