
import Image from 'next/image'

export default function Home() {

  return (
    <main className='d-flex flex-col align-items-center'>
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
    </main>
  )
}
