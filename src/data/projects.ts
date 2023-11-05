import { ProjectData } from "@/model/Project";

const projects: ProjectData[] = [
    {
        title: "Nextjs HJ's Blog",
        description: `현재 블로그로 쓰이고 있는 프로젝트로,
            Nextjs 13 버전을 중심으로 만든 SSG 기반 블로그입니다.
            MDX로 포스트 작성 가능하며, 
            스타일은 Sass로, BEM 방식으로 클래스명을 지정했습니다.`,
        image: "/logo.png",
        teckStacks: ["Nextjs", "React", "Sass"],
        link: {
            github: "https://github.com/Leehyunji0715/hj-blog",
            deployed: "https://bearlee0715.com"
        }
    }
];

export default projects;