import Hero from '@/components/Hero'
import Image from 'next/image'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Testimonials />
    </main>
  )
}
