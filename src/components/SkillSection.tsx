import SectionBox from '@/components/SectionBox'
import {
  NextJsIcon,
  ReactIcon,
  SassIcon,
  TailwindIcon,
  TypescriptIcon,
  ViteIcon,
  WebpackIcon,
} from '@/components/icons'
import Chip from '@/components/Chip'

const skills = [
  { icon: <TypescriptIcon />, text: 'Typescript', category: 'language' },
  { icon: <ReactIcon />, text: 'React', category: 'library' },
  { icon: <NextJsIcon />, text: 'Nextjs', category: 'framework' },
  { icon: <SassIcon />, text: 'Sass', category: 'css' },
  { icon: <TailwindIcon />, text: 'tailwind', category: 'css' },
  { icon: <WebpackIcon />, text: 'Webpack', category: 'build' },
  { icon: <ViteIcon />, text: 'Vite', category: 'build' },
]

export function SkillSection() {
  return (
    <SectionBox title='Skills' className='home__skill'>
      <ul>
        {skills.map(({ icon, text }) => (
          <li key={text}>
            <Chip icon={icon} text={text} />
          </li>
        ))}
      </ul>
    </SectionBox>
  )
}
