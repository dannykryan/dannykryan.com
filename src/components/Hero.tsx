import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div>
      <Navbar />
      <div id="hero" className="container grid lg:grid-cols-2 h-[calc(100vh-60px)] display:flex flex-direction:justify-copntent">
        <div
          className="rounded-full h-[300px] w-[300px] lg:h-[500px] xl:w-[500px] bg-cover bg-center overflow-hidden ml-auto mr-auto mt-auto mb-auto"
          style={{
            backgroundImage: "url(/colourful-bg-danny.png)",
            maxHeight: "700px",
          }}
        ></div>
        <div className="text-[100px] sm:text-[130px] font-bold leading-tight flex justify-center items-center">
          <div>
            <p data-aos="zoom-in-up">Hello!</p>
            <p data-aos="zoom-in-up">I&apos;m</p>
            <p data-aos="zoom-in-up">Danny</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero
