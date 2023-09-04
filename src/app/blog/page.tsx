import FilterablePosts from "@/components/FilterablePosts";
import { getPosts } from "@/service/posts";

export default async function BlogPage() {
    const posts = await getPosts();
    const categories = ['All'].concat(Array.from(new Set(posts.map(post => post.category))));

    return <div className="blog">
        <FilterablePosts categories={categories} posts={posts}/>
    </div>;
}