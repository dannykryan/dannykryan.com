import React from 'react'
import Heading from './Heading'
import Card from './Card'

const data = [
    {
      id: 0,
      title: "Habitap",
      desc: "A Next.js v14 project that uses Supabse to help you to track your habits and scores you for your ability to stick to them.",
      img: "/habitap-bg.png",
      tags: ["React", "Next.js", "CSS", "Supabase"],
      link: "https://habitap.vercel.app/",
    },
    {
      id: 1,
      title: "Study Buddy",
      desc: "A web app built with vanilla HTML, CSS and JS for students to share resources with individual user accounts",
      img: "/studybuddy-bg.png",
      tags: ["HTML", "CSS", "JS", "SQL"],
      link: "https://study-buddy-9en0.onrender.com/",
    },
    {
      id: 2,
      title: "Rise Therapies Website",
      desc: "A vanilla HTML and CSS website for Rise Maternity Therapies. As well as creating ther website, I designed the logo and branding for the busienss.",
      img: "/rise-therapies-bg.png",
      tags: ["HTML", "CSS"],
      link: "https://rise-therapies.co.uk/",
    },
    {
      id: 3,
      title: "Weather App",
      desc: "A weather app that uses APIs to get the weather of any city or town in the world and updates images based on the weather and time of day.",
      img: "/weather-app-bg.png",
      tags: ["HTML", "CSS", "JS", "API"],
      link: "https://github.com/dannykryan/soc3-weatherApp"
    },
  ];

const Projects = () => {
  return (
    <div id="projects" className="container pt-32">
      <Heading title="My Projects"/>
      <div className="grid gap-10 xl:gap-0 xl:gap-y-10 md:grid-cols-2 lg:grid-cols-4 place-items-center">
        {data.map((el) => (
        <Card 
            key={el.id}
            title={el.title}
            desc={el.desc}
            img={el.img}
            tags={el.tags}
            link={el.link}
        />
        ))}
      </div>
    </div>
  )
}

export default Projects
Projects