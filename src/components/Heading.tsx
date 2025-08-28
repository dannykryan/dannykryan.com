import React from 'react'

interface propsType {
    title: string;
}

const Heading: React.FC<propsType> = ({title}) => {
  return (
    <div className="text-center pb-8">
      <h2 className="border-b-2 text-4xl font-bold border-orange dark:border-green border-custom inline-block pb-2">{title}</h2>
    </div>
  )
}

export default Heading
