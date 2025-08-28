import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface propsType {
    title: string;
    desc: string;
    img: string;
    tags: string[];
    link: string;
}

const Card:React.FC<propsType> = ({ title, desc, img, tags, link }) => {
  return (
    <div 
      className="rounded-t-3xl overflow-hidden w-full h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:cursor-pointer dark:hover:shadow-gray-800 group" 
    >
      <div className="overflow-hidden">
        <Link href={link}>
          <div className="relative h-[150px] sm:h-[200px] overflow-hidden">
            <Image 
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                src={img}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt={title}
            />
          </div>
        </Link>
      </div>

      <div className="p-5 bg-offWhiteLight space-y-3 rounded-b-3xl dark:bg-charcoalMid text-charcoal dark:text-offWhite flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-medium">{title}</h3>
          <p className="text-sm mt-2">{desc}</p>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map((el) => (
            <span 
              className="px-3 py-1 text-xs rounded-full bg-orangeLight dark:bg-greenLight text-charcoal"
              key={el}>
                {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card