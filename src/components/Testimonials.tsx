import React from 'react'
import Heading from './Heading';
import TestimonialCard from './TestimonialCard';

const testimonialData = [
    {
      companyName: "VINCI Energies UK & ROI",
      desc: `"I've had the pleasure of working with Danny for five years, and it has been a truly enjoyable experience. He's not only easy to work with but also highly professional. Danny is always eager to dive into tasks, explore new avenues, and tackle challenges creatively. Danny approaches tasks with a critical eye and a genuine desire to enhance processes. I wholeheartedly recommend him to any company seeking a dedicated and capable team member."`,
      img: "/Bruno-profile.jpg",
      name: "Bruno Seguin",
      designation: "Communication Manager",
      Linkedin: "https://www.linkedin.com/in/bruno-seguin/"
    },
    {
      companyName: "School of Code",
      desc: `"I worked with Danny on the School of Code Bootcamp. I want to commend him for his dedication to finding solutions. Danny was a real team player and actively worked hard to explain concepts to others and help them with their professional development. I thoroughly enjoyed working in a team with him and believe he would be an asset to any tech team!"`,
      img: "/Anna-Martins-profile.jpg",
      name: "Anna Martins",
      designation: "Fellow Bootcamper",
      Linkedin: "https://www.linkedin.com/in/anna-martins-6b1707261/"
    },
    {
      companyName: "School of Code",
      desc: `"Danny's guidance and mentorship had a profound impact on my learning journey, consistently urging me to challenge myself and step out of my comfort zone.
      Danny's encouragement and insights created an environment that fostered growth and exploration. His mentorship style not only facilitated a successful project but also inspired me to approach challenges with confidence. I'm grateful for the knowledge and skills I gained during this collaboration."`,
      img: "/Alexandra-Nasonova-profile.jpg",
      name: "Alexandra Nasonova",
      designation: "Fellow Bootcamper",
      Linkedin: "https://www.linkedin.com/in/alexandra-n-b4397013b/"
    },
  ];

const Testimonials = () => {
  return (
    <div id="testimonials" className="container pt-16">
      <Heading title="Testimonials"/>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonialData.map((item, index) => (
          <TestimonialCard
            key={index}
            companyName={item.companyName}
            desc={item.desc}
            img={item.img}
            name={item.name}
            designation={item.designation}
            Linkedin={item.Linkedin}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
