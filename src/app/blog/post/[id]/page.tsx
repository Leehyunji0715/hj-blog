import Image from 'next/image';
import { redirect } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize"
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import MDXArticle from "@/components/mdx/MDXArticle";
import { getPost } from "@/service/posts";


type Props = {
    params: { id: string }
};

export default async function BlogPostPage({ params: {id} }: Props) {
    const postId = Number(id);
    if (Number.isNaN(postId)) {
        redirect('/not-found');
    }
    const post = await getPost(postId);
    const imgSrc = post?.image ?? '/default_post_img.jpg';
    if (!post || !post.content) {
        redirect('/not-found');
    }

    const mdxSource = await serialize(post.content, { 
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrettyCode],
        }
    })

    return <div className='post'>
        <header className='post__header'>
            <h1>[{post.category}] - {post.title}</h1>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            <Image src={imgSrc} width={500} height={300} alt={`image of ${post.title}`}/>
        </header>
        <article>
            <MDXArticle content={mdxSource} />
        </article>
    </div>
}