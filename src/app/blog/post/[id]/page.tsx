import Image from 'next/image';
import { redirect } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from 'rehype-pretty-code';
import { bundleMDX } from 'mdx-bundler';
import MDXArticle from "@/components/mdx/MDXArticle";
import { getPosts, getPostContent, getPost } from "@/service/posts";
import { getImageSrcFrom } from '@/util/image';
import { genPageMetadata } from '@/util/seo';


type Props = {
    params: { id: string }
};

export async function generateMetadata({ params: { id } }: Props) {
    const post = await getPost(id);
    if (!post) return;

    return genPageMetadata({
        title: post.title,
        description: post.description,
        image: post.image
    })
}

export const dynamic = 'force-static';
export async function generateStaticParams() {
    const arr = await getPosts();
    if (!arr) return [];

    return arr.map((item) => ({
        id: item.path.toString()
    }));
}

export default async function BlogPostPage({ params: {id} }: Props) {
    const post = await getPostContent(id);
    if (!post) {
        redirect('/not-found');
    }
    
    const {content} = post;
    const imgSrc = getImageSrcFrom(post);
    const { code, frontmatter } = await bundleMDX({ 
        source: content /*post.content*/,
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
            </h1>
            <time>{new Date(post.date /*post.createdAt*/).toLocaleDateString()}</time>
            <Image src={imgSrc} width={500} height={500} alt={`image of ${post.title}`}/>
        </header>
        <article>
            <MDXArticle code={code} />
        </article>
    </div>
}