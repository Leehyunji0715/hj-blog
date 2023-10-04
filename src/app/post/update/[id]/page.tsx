import Link from 'next/link';
import { getServerSession } from 'next-auth';
import UpdatePost from '@/components/admin/UpdatePost';
import { getPost } from '@/service/posts';
import { $Enums } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


type Props = {
    params: { id: string }
}


export default async function BlogUpdatePage({ params: { id } }: Props) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== $Enums.Role.ADMIN) {
        return <div>
            Only Admin user can access.
            <Link href='/'>Go to Home</Link>
        </div>
    }
    
    const post = await getPost(Number(id));
    if (!post || !post.content) {
        return "no post";
    }

    return <>
        <UpdatePost 
            id={Number(id)} 
            image={post.image ?? ''} 
            content={post.content} 
        />
    </>
}