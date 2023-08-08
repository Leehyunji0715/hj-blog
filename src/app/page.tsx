import Image from 'next/image'
import { MouseIcon } from '@/components/icons'


export default function Home() {
  return (
    <main className='d-flex flex-col align-items-center'>
      <section className='section-profile'>
        <div className='profile-text'>
          <h1>Hello, I'm Hyunji</h1>
          <h2 className='mt-md'>Frontend Developer</h2>
          <h3 className='mt-sm' >Enjoying new experience and learning</h3>
          <span className='profile-text__guide'>
            <MouseIcon/> Scroll down
          </span>
        </div>
        <Image src='/profile_bg.svg' width={500} height={500} alt='profile background'/>
      </section>
      <section className='airballoon-scroll-timeline'>
        <div className='track'>
          <img src='/line.svg' alt="path"/>
          <Image src='/airballoon.svg' width={100} height={100} alt='hot air ballon' className='airballoon'/>
        </div>
      </section>
    </main>
  )
}
