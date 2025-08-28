"use client"

import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

export default function Home() {

  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  )
}
