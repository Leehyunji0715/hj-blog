import { Post } from "@/service/posts";

export function getImageSrcFrom(post: Post) {
    // const imageFile = post.imageFile ? Buffer.from(post.imageFile).toString('base64') : null;
    // if (imageFile) {
    //     return `data:image/png;base64,${imageFile}`;
    // }
    // if (post.image) {
    //     return post.image;
    // }
    return '/default_post_img.jpg';
}