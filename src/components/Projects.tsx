import React from 'react'
import Heading from './Heading'
import Card from './Card'

const projectData = [
    {
      id: 0,
      title: "Habitap",
      desc: "A Next.js v14 project that uses Supabase to help you to track your habits and scores you for your ability to stick to them.",
      img: "/habitap-bg.png",
      tags: ["React", "Next.js", "CSS", "Supabase"],
      link: "https://habitap.vercel.app/",
    },
    {
      id: 1,
      title: "Study Buddy",
      desc: "A web app built with vanilla HTML, CSS and JS for students to share resources with individual user accounts.",
      img: "/studybuddy-bg.png",
      tags: ["HTML", "CSS", "JS", "SQL"],
      link: "https://study-buddy-9en0.onrender.com/",
    },
    {
      id: 2,
      title: "Rise Therapies Website",
      desc: "A vanilla HTML and CSS website for Rise Maternity Therapies that included logo and branding design.",
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
    <div id="projects" className="container">
      <Heading title="My Projects"/>
      <div className="flex flex-wrap justify-center gap-8">
        {projectData.map((el) => (
          <div 
            key={el.id} 
            className="w-full max-w-sm flex-shrink-0"
          >
            <Card 
              title={el.title}
              desc={el.desc}
              img={el.img}
              tags={el.tags}
              link={el.link}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
Projects