import React from 'react'
import Heading from './Heading'
import Card from './Card'

const projectData = [
  {
      id: 0,
      title: "Budget Reporting Tool for Harvest",
      desc: "Generate comprehensive budget reports for Harvest projects by aggregating time entries, costs, and roles into a Google Sheet.",
      img: "/harvest-budget-report.png",
      tags: ["Google Apps Script", "Javascript", "Harvest API"],
      link: "https://github.com/dannykryan/harvest-budget-report"
    },
    {
      id: 1,
      title: "Team Capacity Reporting Dashboard",
      desc: "Provides real-time insights into team capacity for leave, holidays and asssigned projects by integrating with Monday.com, LeaveDates, and Harvest APIs.",
      img: "/team-capacity-dashboard.png",
      tags: ["Harvest API", "LeaveDates API", "Monday API"],
      link: "https://github.com/dannykryan/team-capacity-reporting-dashboard"
    },
    {
      id: 2,
      title: "Habitap",
      desc: "A Next.js v14 project that uses Supabase to help you to track your habits and scores you for your ability to stick to them.",
      img: "/habitap-bg.png",
      tags: ["React", "Next.js", "CSS", "Supabase"],
      link: "https://github.com/dannykryan/habitap",
    },
    {
      id: 3,
      title: "Study Buddy",
      desc: "A web app built with vanilla HTML, CSS and JS for students to share resources with individual user accounts.",
      img: "/studybuddy-bg.png",
      tags: ["HTML", "CSS", "JS", "SQL"],
      link: "https://github.com/dannykryan/studybuddy",
    },
    {
      id: 4,
      title: "Rise Therapies Website",
      desc: "A vanilla HTML and CSS website for Rise Maternity Therapies that included logo and branding design.",
      img: "/rise-therapies-bg.png",
      tags: ["HTML", "CSS"],
      link: "https://github.com/dannykryan/rise-therapies",
    },
  ];

const Projects = () => {  
  return (
    <div id="projects" className="container">
      <Heading title="My Projects"/>
      <div className="flex flex-wrap justify-center gap-4 xl:gap-8">
        {projectData.map((el) => (
          <div 
            key={el.id} 
            className="w-full max-w-[280px] md:max-w-xs"
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