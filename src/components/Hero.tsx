import React from 'react'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'


const Hero = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="pt-36 lg:pt-12 pb-12 lg:pb-0">
      <div id="hero" className="grid lg:grid-cols-2 gap-4 lg:h-[calc(100vh-400px)] display:flex flex-direction:justify-content lg:py-4rem">
        <div className="relative w-full h-[300px] md:h-[400px] my-auto rounded-3xl overflow-hidden"> 
          <Image
            src={isDarkMode ? "/alien-danny-dark-green.png" : "/alien-danny-light-orange.png"}
            alt="Alien Danny"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: '50% 15%' }}
          />
        </div>
        <div className="flex justify-center lg:justify-start items-center text-center lg:text-left lg:pl-10">
          <div>
            <p
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Hello, I&apos;m Danny!
            </p>
            <p className="mt-4 mb-6">
              I&apos;m a developer with experience building sites and applications in WordPress, React, Tailwind CSS, and API integrations for clients from a variety of different sectors.
            </p>
            
            <div className="mt-2 flex justify-center lg:justify-start gap-4">
              <a href="#contact" className="button-primary inline-block">
                Get in Touch
              </a>
              <a 
                href="/danny-ryan-cv.pdf" 
                className="button-secondary inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
