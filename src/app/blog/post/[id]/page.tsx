import Image from 'next/image';
import Link from 'next/link';
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import { bundleMDX } from 'mdx-bundler';
import MDXArticle from "@/components/mdx/MDXArticle";
import { getPost } from "@/service/posts";
import { EditIcon } from '@/components/icons';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { $Enums } from '@prisma/client';


type Props = {
    params: { id: string }
};

export default async function BlogPostPage({ params: {id} }: Props) {
    const postId = Number(id);
    if (Number.isNaN(postId)) {
        redirect('/not-found');
    }
    const session = await getServerSession(authOptions);
    const post = await getPost(postId);
    const imgSrc = post?.image ?? '/default_post_img.jpg';
    if (!post || !post.content) {
        redirect('/not-found');
    }

    const { code } = await bundleMDX({ 
        source: post.content,
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
            options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrettyCode as any]
            return options;
        },
    });

    return <div className='post'>
        <header className='post__header'>
            <h1>
                [{post.category}] - {post.title}
                {
                    session?.user.role === $Enums.Role.ADMIN && <Link href={`/post/update/${postId}`}><EditIcon/></Link> 
                }
            </h1>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            <Image src={imgSrc} width={500} height={400} alt={`image of ${post.title}`}/>
        </header>
        <article>
            <MDXArticle code={code} />
        </article>
    </div>
}