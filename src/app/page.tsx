
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
      <SectionBox title='Career' className='home__career' direction='right'>
        <div>BizFlow</div>
      </SectionBox>
      <SectionBox title='Projects'>
      </SectionBox>
      <SectionBox title='Certification' direction='right'>
      </SectionBox>
    </div>
  )
}
