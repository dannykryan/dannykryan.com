"use client"

import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-back",
      duration: 1200,
      delay: 100,
      mirror: true,
      anchorPlacement: "bottom-bottom",
      offset: 160,
    });
    AOS.refresh();
  }, [])

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  )
}
