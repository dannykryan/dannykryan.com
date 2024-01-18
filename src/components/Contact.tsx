"use client"

import React from 'react'
import {AiOutlineMail} from "react-icons/ai"
import {BsTelephone} from "react-icons/bs"
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Contact = () => {

  return (
    <motion.section 
      id="contact" 
      className="pt-32 container"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <div>
        <div className="flex flex-col items-center space-y-8">
            <h2 className="text-5xl">Get in touch</h2>
            <p className="text-gray-600 text-[18px] pt-2">
                Drop me a message if you have any questions or just want to say hi and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="flex gap-3 items-center">
                <AiOutlineMail size={30} /> <a className="underline" href="mailto:dannykryan@gmail.com">dannykryan@gmail.com</a>
            </div>

            <div className="flex gap-3 items-center">
                <BsTelephone size={30} /> 07948679828
            </div>

        </div>
      </div>
    </motion.section>
  )
}

export default Contact
