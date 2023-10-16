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
import { getImageSrcFrom } from '@/util/image';


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
    if (!post || !post.content) {
        redirect('/not-found');
    }
    
    const imgSrc = getImageSrcFrom(post);
    const { code, frontmatter } = await bundleMDX({ 
        source: post.content,
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
            options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrettyCode as any]
            return options;
        },
    });

    // console.log("frontmatter", frontmatter);

    return <div className='post'>
        <header className='post__header'>
            <h1>
                [{post.category}] - {post.title}
                {
                    session?.user.role === $Enums.Role.ADMIN && <Link href={`/post/update/${postId}`}><EditIcon/></Link> 
                }
            </h1>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            <Image src={imgSrc} width={500} height={500} alt={`image of ${post.title}`}/>
        </header>
        <article>
            <MDXArticle code={code} />
        </article>
    </div>
}