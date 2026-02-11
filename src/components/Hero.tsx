import React from 'react'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'


const Hero = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="pt-12 mt-[88px] lg:mt-[110px] lg:pt-0 pb-16 lg:pb-24">
      <div id="hero" className="grid lg:grid-cols-2 gap-8 lg:gap-4 lg:h-[calc(100vh-400px)] display:flex flex-direction:justify-content lg:py-4rem">
        <div className="relative w-full h-[300px] md:h-[400px] my-auto rounded-3xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/alien-danny-dark-green.png"
              alt="Alien Danny (Dark Mode)"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                isDarkMode ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: '50% 15%' }}
            />
            <Image
              src="/alien-danny-light-orange.png"
              alt="Alien Danny (Light Mode)" 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                isDarkMode ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ objectPosition: '50% 15%' }}
            />
          </div>
        </div>
        <div className="flex justify-center lg:justify-start items-center text-center lg:text-left lg:pl-10">
          <div>
            <p
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Hello, I&apos;m Danny!
            </p>
            <p className="mt-4 mb-2">
              I&apos;m a full-stack developer building websites and web applications using WordPress, React, Tailwind CSS, TypeScript, and a variety of APIs. I work with clients across multiple sectors to deliver custom solutions that integrate design, functionality, and data.
            </p>
            <p className="mb-6">I&apos;m always working on something new so please check out my code at <a href="http://www.github.com/dannykryan" className="underline hover:text-orange dark:hover:text-green transition-colors duration-200">Github</a>.</p>
            
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
