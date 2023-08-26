import BgProfileImage from "@/components/BgProfileImage";
import Chip from "@/components/Chip";
import { TypescriptIcon, NextJsIcon, ReactIcon, SassIcon, TailwindIcon } from "@/components/icons";

const aboutList = [
    { category: "Name", value: process.env.NAME },
    { category: "Phone", value: process.env.PHONE_NUMBER },
    { category: "Email", value: process.env.EMAIL_ADDRESS },
    { category: "GitHub", value: process.env.GITHUB_URL, isLink: true },
];

const skills = [
    { icon: <TypescriptIcon/>, text: 'Typescript', category: 'language' },
    { icon: <ReactIcon/>, text: 'React', category: 'library' },
    { icon: <NextJsIcon/>, text: 'Next', category: 'framework' },
    { icon: <SassIcon/>, text: 'Sass', category: 'css' },
    { icon: <TailwindIcon/>, text: 'tailwind', category: 'css' },
];

const careers = [
    { 
        company: 'Bizflow Corp', 
        period: '2021.7.4 ~ ', 
        description: [
            '회사의 제품인 AppDev 웹 어플리케이션의 프론트엔드 개발을 담당 했습니다.\n Typescript, React, Sass 를 주로 사용했습니다.',
            'BPM(Business Process Management)의 프로세스를 디자인 할 수 있는, BPS라는 자바 기반 레거시 프로그램을 분석하여, 새롭게 웹앱으로 개발했습니다.'
        ] 
    }
];

export default function AboutPage() {
    return <div className="about">
        <section className="about--main">
            <h1 className="heading-1 mb-md">About</h1>
            <div className="about--main__body">
                <BgProfileImage/>
                <ul>
                    {aboutList.map(item => (
                        <li key={item.value}>
                            <span>{item.category}:</span>
                            {item.isLink ? <a target="_blank" href={item.value}>{item.value}</a> : item.value}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        <section className="about__skill">
            <h1 className="heading-1 mb-md">Skills</h1>
            <ul>
                {skills.map(( {icon, text} ) => (
                    <li key={text}>
                        <Chip icon={icon} text={text}/>
                    </li>
                ))}
            </ul>
        </section>
        <section className="about__career">
            <h1 className="heading-1 mb-md">Career</h1>
            <ul>
                { careers.map(({ company, period, description }) => (
                    <li key={company}>
                        <div className="about__career-company">
                            <h2 className="heading-2">{company}</h2>
                            <span className="ml-sm">({period})</span>
                        </div>
                        <ul className="about__career-company-description">
                            {description.map((text, i) => <li key={i}>{text}</li>)}
                        </ul>
                    </li>)) 
                }
            </ul>
        </section>
        {/* <aside>
            <h2>Table of Contents</h2>
        </aside> */}
    </div>;
}