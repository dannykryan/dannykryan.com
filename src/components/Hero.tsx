import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div>
      <Navbar />
      <div id="hero" className="container grid lg:grid-cols-2 h-[calc(100vh-60px)] display:flex flex-direction:justify-copntent lg:mb-4rem">
        <div
          className="rounded-full h-[300px] w-[300px] lg:h-[500px] xl:w-[500px] bg-cover bg-center overflow-hidden ml-auto mr-auto mt-auto mb-auto"
          style={{
            backgroundImage: "url(/colourful-bg-danny.png)",
            maxHeight: "700px",
          }}
        ></div>
        <div className="flex justify-center items-center">
          <div>
            <p
              data-aos="zoom-in-up"
              className="text-[100px] lg:text-[130px] md:text-[70px] sm:text-[50px] xs:text-[30px] font-bold leading-tight"
              style={{ fontSize: 'clamp(30px, 5vw, 130px)' }} // Responsive font size
            >
              Hello! I&apos;m Danny...
            </p>
            <br />
            <p className="mt-15">
              A junior dev who loves design based in Birmingham, UK. I love to make things that bring a smile to people&apos;s faces.
            </p>
            <br />
            <p>
              As well as programming, I&apos;ve got skills in design, photography, video and audio production, and lots more gained from 5 years working in Communications and Marketing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
