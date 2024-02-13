import React from 'react'
import Image from 'next/image'

interface propsType {
    companyName: string;
    desc: string;
    img: string;
    name: string;
    designation: string;
}

const TestimonialCard: React.FC<propsType> = ({
    companyName,
    desc,
    img,
    name,
    designation,
}) => {
  return (
    <div data-aos="zoom-in-up" className="p-4 md:p-8"> {/* Added padding for smaller screens */}
        <div className="border border-accent p-4 md:p-8 h-full flex flex-col justify-between"> {/* Adjusted padding */}
            <h2 className="text-3xl text-accent">{companyName}</h2>
            <p className="overflow-auto md:overflow-visible">{desc}</p> {/* Added overflow handling */}
            <div className="flex gap-4 items-center"> {/* Adjusted alignment */}
                <Image 
                    className="grayscale rounded-full"
                    src={img}
                    height={50}
                    width={50}
                    alt="user"
                />
                <div>
                    <h2>{name}</h2>
                    <p className="text-gray-500">{designation}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TestimonialCard
