import GridPostList from "@/components/GridPostList";
import { getAllPosts } from "@/service/posts";

export default async function BlogPage() {
    const posts = await getAllPosts();
    const categories = ['All'].concat(Array.from(new Set(posts.map(post => post.category))));// [...new Set(posts.map(post => post.category))];

    return <div className="blog">
        블로그
        <ul>{categories.map(category => <span style={{ marginRight: '1rem' }}>{category}</span>)}</ul>
        <section>
            <GridPostList posts={posts}/>
        </section>
    </div>;
}