
import Image from 'next/image'
import { NextJsIcon, ReactIcon, SassIcon, TailwindIcon, TypescriptIcon } from '@/components/icons';
import Chip from '@/components/Chip';
import SectionBox from '@/components/SectionBox';

const skills = [
  { icon: <TypescriptIcon/>, text: 'Typescript', category: 'language' },
  { icon: <ReactIcon/>, text: 'React', category: 'library' },
  { icon: <NextJsIcon/>, text: 'Next', category: 'framework' },
  { icon: <SassIcon/>, text: 'Sass', category: 'css' },
  { icon: <TailwindIcon/>, text: 'tailwind', category: 'css' },
];

const careers = [
  { company: 'BizFlow Corp', period: '2022.1.1 ~ (Current)', work: '웹 어플리케이션 FE 개발' },
  { company: 'BizFlow Corp', period: '2021.7.5 ~ 2021.12.31', work: 'FE 개발 인턴' },
];

const certifications = [
  'SQLD',
  'PCCP (희망사항)'
];

export default function Home() {
  return (
    <div className='home d-flex flex-col'>
      <section className='section-profile'>
        <div className='profile-text'>
          <h1>{`Hello, I'm Hyunji`}</h1>
          <h2 className='mt-md'>Frontend Developer</h2>
          <h3 className='mt-sm' >Enjoying new experience and learning</h3>
        </div>
        <div className='profile-img'>
          <Image className='profile-img-bg' src='/profile_bg.svg' fill alt='profile background'/>
          <Image className='profile-img-main' src='/sample_profile.png' fill alt='profile'/>
        </div>
      </section>
      <SectionBox title='Skills' className='home__skill'>
        <ul>
          {skills.map(( {icon, text} ) => (
            <li key={text}>
              <Chip icon={icon} text={text}/>
            </li>
          ))}
        </ul>
      </SectionBox>
      <SectionBox title='Certification' direction='right' className='home__certification'>
        <ul>
          {certifications.map((certificate, i) => (
            <li key={i}>
              <Chip text={certificate}/>
            </li>
          ))}
        </ul>
      </SectionBox>
      <SectionBox title='Career' className='home__career'>
        <ul>
          {careers.map(career => (
            <li>
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
        <div className='home__project-item'>
          <Image src='/logo.png' width={300} height={300} alt='blog image' className='home__project-item-img'/>
          <div className='home__project-item-description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt tortor vel ex pretium, sit amet vestibulum ligula sodales. Curabitur a sem ligula. Etiam ut convallis nulla. Donec quis condimentum urna. Cras at ultricies tortor, a commodo nibh. Proin ac mi gravida tellus gravida ullamcorper at et est.
          </div>
        </div>
        <div className='home__project-item'>
          <Image src='/logo.png' width={300} height={300} alt='blog image' className='home__project-item-img'/>
          <div className='home__project-item-description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tincidunt tortor vel ex pretium, sit amet vestibulum ligula sodales. Curabitur a sem ligula. Etiam ut convallis nulla. Donec quis condimentum urna. Cras at ultricies tortor, a commodo nibh. Proin ac mi gravida tellus gravida ullamcorper at et est.
          </div>
        </div>
      </SectionBox>
    </div>
  )
}
