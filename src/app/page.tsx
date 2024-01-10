
import Image from 'next/image'
import { NextJsIcon, ReactIcon, SassIcon, TailwindIcon, TypescriptIcon } from '@/components/icons';
import Chip from '@/components/Chip';
import SectionBox from '@/components/SectionBox';
import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects';

const skills = [
  { icon: <TypescriptIcon />, text: 'Typescript', category: 'language' },
  { icon: <ReactIcon />, text: 'React', category: 'library' },
  { icon: <NextJsIcon />, text: 'Nextjs', category: 'framework' },
  { icon: <SassIcon />, text: 'Sass', category: 'css' },
  { icon: <TailwindIcon />, text: 'tailwind', category: 'css' },
];

const careers = [
  { company: 'BizFlow Corp', period: '2022.1.1 ~ (Current)', work: '웹 어플리케이션 FE 개발' },
  { company: 'BizFlow Corp', period: '2021.7.5 ~ 2021.12.31', work: 'FE 개발 인턴' },
];

const certifications = [
  'SQLD',
  /* 'PCCP (희망사항)'*/
];


export default function Home() {
  return (
    <div className='home d-flex flex-col'>
      <section className='section-profile'>
        <div className='profile-text'>
          <h1>Hello, {`I'm`} <span className='text-highlight'>Hyunji</span></h1>
          <h2 className='mt-md'>Frontend Developer</h2>
          <h3 className='mt-sm' >Enjoying new experience and learning</h3>
        </div>
        <div className='profile-img'>
          <Image priority className='profile-img-main' src='/images/site/profile.svg' fill alt='profile image' />
        </div>
      </section>
      <SectionBox title='Skills' className='home__skill'>
        <ul>
          {skills.map(({ icon, text }) => (
            <li key={text}>
              <Chip icon={icon} text={text} />
            </li>
          ))}
        </ul>
      </SectionBox>
      <SectionBox title='Certification' direction='right' className='home__certification'>
        <ul>
          {certifications.map((certificate, i) => (
            <li key={i}>
              <Chip text={certificate} />
            </li>
          ))}
        </ul>
      </SectionBox>
      <SectionBox title='Career' className='home__career'>
        <ul>
          {careers.map((career, i) => (
            <li key={i}>
              <div className='home__career-company-box'>
                <span className='home__career-company'>{career.company}</span>
                <span className='home__career-period'>{career.period}</span>
              </div>
              <div className='home__career-work'>{career.work}</div>
            </li>
          ))}
        </ul>
      </SectionBox>
      <SectionBox title='Projects' direction='center' className='home__project'>
        {projects.map((project, i) => <ProjectCard key={i} {...project} />)}
      </SectionBox>
    </div>
  )
}
