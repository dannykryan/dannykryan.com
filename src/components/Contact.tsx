"use client"

import React from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"

const Contact = () => {

  return (
    <div className="pt-16">
      <div className="flex flex-col items-center gap-2">
          <h2 className="border-b-2 text-4xl font-bold border-orange dark:border-green border-custom inline-block pb-2">Get in touch</h2>
          <p className="text-charcoalLight text-[18px] pt-8">
              Drop me a message if you have any questions or just want to say hi and I&apos;ll get back to you as soon as I can.
          </p>

          <div className="flex gap-3 items-center">
              <AiOutlineMail size={30} /> <a className="underline hover:text-orange dark:hover:text-green" href="mailto:dannykryan@gmail.com">dannykryan@gmail.com</a>
          </div>

          <div className="flex gap-3 items-center">
              <BsTelephone size={30} /> 07948679828
          </div>

      </div>
    </div>
  )
}

export default Contact
