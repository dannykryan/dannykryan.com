import React from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"

const Contact = () => {
  return (
    <div id="contact" className="pt-32 container">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-8">
            <h2 className="text-5xl" data-aos="zoom-in-up">Get in touch</h2>
            <p className="text-gray-600 text-[18px] pt-2" data-aos="zoom-in-up">
                Drop me a message if you have any questions or just want to say hi and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="flex gap-3 items-center" data-aos="zoom-in-up">
                <AiOutlineMail size={30} /> <a className="underline" href="mailto:dannykryan@gmail.com">dannykryan@gmail.com</a>
            </div>

            <div className="flex gap-3 items-center" data-aos="zoom-in-up">
                <BsTelephone size={30} /> 07948679828
            </div>

        </div>

        <div className="space-y-8" data-aos="zoom-in-up">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input type="text" className="h-[40px] bg-transparent border border-accent" id="name" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="text" className="h-[40px] bg-transparent border border-accent" id="email" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="msg">Message</label>
                <textarea className="bg-transparent border border-accent" id="msg" rows={8} />
            </div>

            <button className="bg-accent p-2 px-6">Send</button>

        </div>

      </div>
    </div>
  )
}

export default Contact
