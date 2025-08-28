import React from 'react'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'


const Hero = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="pt-36 lg:pt-12 pb-12 lg:pb-0">
      <div id="hero" className="grid lg:grid-cols-2 gap-4 lg:h-[calc(100vh-400px)] display:flex flex-direction:justify-copntent lg:py-4rem">
        <div className="relative w-full h-[300px] md:h-[400px] my-auto rounded-3xl overflow-hidden"> 
          <Image
            src={isDarkMode ? "/alien-danny-dark-green.png" : "/alien-danny-light-orange.png"}
            alt="Alien Danny"
            fill
            priority
            className="object-cover lg:object-top"
          />
        </div>
        <div className="flex justify-center items-center text-center lg:text-left lg:pl-10">
          <div>
            <p
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Hello, I&apos;m Danny!
            </p>
            <br />
            <p className="mt-15">
              I’m a developer with experience building sites and applications in WordPress, React, Tailwind CSS, and API integrations for clients form a variety of different sectors.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
