import React from 'react'
import Heading from './Heading';
import TestimonialCard from './TestimonialCard';

const testimonialData = [
    {
      companyName: "School of Code",
      desc: `"I worked with Danny on the School of Code Bootcamp. I want to commend him for his dedication to finding solutions. Danny was a real team player and actively worked hard to explain concepts to others and help them with their professional development. I thoroughly enjoyed working in a team with him and believe he would be an asset to any tech team!"`,
      img: "/Anna-Martins-profile.jpg",
      name: "Anna Martins",
      designation: "Felllow Bootcamper",
    },
    {
      companyName: "School of Code",
      desc: `"I have had the pleasure working on a project with Danny at the SOC. Our week collaborating on a project centred around databases was truly one of my favourites. Danny's guidance and mentorship had a profound impact on my learning journey, consistently urging me to challenge myself and step out of my comfort zone.
      Danny's encouragement and insights created an environment that fostered growth and exploration. His mentorship style not only facilitated a successful project but also inspired me to approach challenges with confidence. I'm grateful for the knowledge and skills I gained during this collaboration.
      Thank you, Danny, for a fantastic week of learning and pushing boundaries together!"`,
      img: "/Alexandra-Nasonova-profile.jpg",
      name: "Alexandra Nasonova",
      designation: "Fellow Bootcamper",
    },
  ];

const Testimonials = () => {
  return (
    <div className="contiainer pt-32">
      <Heading title="Testimonials"/>
      <div className="grid md:grid-cols-2  lg:grid-cols-2 gap-8">
        {testimonialData.map((item, index) => (
            <TestimonialCard
                key={index}
                companyName={item.companyName}
                desc={item.desc}
                img={item.img}
                name={item.name}
                designation={item.designation}
            />
        ))}
      </div>
    </div>
  )
}

export default Testimonials
