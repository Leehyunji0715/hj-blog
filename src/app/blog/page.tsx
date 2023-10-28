import CategoryChipList from "@/components/CategoryChipList";
import FilterablePosts from "@/components/FilterablePostList";
import { $Enums } from "@prisma/client";

const POSTS_PER_PAGE = 12;

export default async function BlogPage({posts}: any) {
    // const posts = await getAllPosts();
    console.log("posts", posts);
    const categories = ['ALL'].concat(Object.values($Enums.Category));
    const pageNumber = 1;

    return (
        <div className="blog">
            <CategoryChipList currentCategory={'all'} categories={Object.values($Enums.Category)}/>
            {/* <FilterablePosts posts={posts}/> */}
            {/* <div className="blog__post-list">
                { posts.length ? <GridPostList posts={posts}/> : "No Post"}
            </div>
            <PostPaginator total={curCount}/> */}
        </div>
    )
}