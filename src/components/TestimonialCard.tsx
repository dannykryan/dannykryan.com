import React from 'react'
import Image from 'next/image'

interface propsType {
    companyName: string;
    desc: string;
    img: string;
    name: string;
    designation: string;
    linkedin: string;
}

const TestimonialCard: React.FC<propsType> = ({
    companyName,
    desc,
    img,
    name,
    designation,
    linkedin
}) => {
  return (
    <div className="bg-offWhiteLight dark:bg-offWhite text-charcoal min-w-[300px] border rounded-3xl p-4 md:p-8 h-full flex flex-col justify-between">
        <p className="overflow-auto md:overflow-visible">{desc}</p>
        <a href={linkedin} className="hover:cursor-pointer">
            <div className="flex gap-4 items-center pt-4 group">
                <Image 
                    className="grayscale rounded-full group-hover:grayscale-0 transition-all duration-300"
                    src={img}
                    height={50}
                    width={50}
                    alt="user"
                />
                <div>
                    <h2 className="font-bold">{name}</h2>
                    <p className="text-charcoalMid">{designation}, {companyName}</p>
                </div>
            </div>
        </a>
    </div>
  )
}

export default TestimonialCard
