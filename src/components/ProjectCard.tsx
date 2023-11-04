import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "./icons";

type Props = {
    title: string;
    description: string;
    image: string;
    teckStack: string;
    link?: {
        github: string;
        deployed?: string;
    }
};

export default function ProjectCard() {
    return <div className="project-card">
        <Image src='/logo.png' width={300} height={200} alt='blog image' className='project-card-img'/>
          <div className='project-card-information'>
            <h2>Nextjs HJ Blog</h2>
            <p className='project-card-description'>
                현재 블로그로 쓰이고 있는 프로젝트입니다.<br/>
                "Nextjs 13" 버전을 중심으로 만든 "SSG" 기반 블로그입니다.<br/>
                "MDX"로 포스트 작성 가능하며, 
                스타일은 SASS로, 구조화된 scss 파일을 기반으로 유지보수가 간편하게 되어있음.
            </p>
            <div>
              NextJS, React, SASS 
            </div>
            <Link href={``} target='_blank'>
              <GitHubIcon/>
            </Link>
        </div>
    </div>
}