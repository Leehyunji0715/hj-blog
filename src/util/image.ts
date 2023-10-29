import { Post } from "@/service/posts";

export function getImageSrcFrom(post: Post) {
    const dir = '/images/posts';
    const file = post.image ?? 'default_post_img.jpg';
    return `${dir}/${file}`;
}