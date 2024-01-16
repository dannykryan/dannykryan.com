import React from 'react'

const Skills = () => {
  return (
    <div className="container pt-32">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div>
            <h2 className="text-4xl md:text-5xl">Technologies I work with</h2>
            <p className="text-gray-500 pt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae illo sint obcaecati vel distinctio animi rerum autem quibusdam libero? Possimus, fugiat? Laborum molestias unde fuga nobis obcaecati, doloremque nihil beatae.
            </p>
        </div>

        <div>
            <div className="grid grid-cols-2 text-accent text-3xl sm:text-4xl">
                <div className="space-y-2">
                <h2>CSS</h2>
                    <h2>HTML</h2>
                    <h2>Javascript</h2>
                    <h2>Next.js</h2>
                </div>
                <div className="space-y-2">
                    <h2>React.js</h2>
                    <h2>Tailwind</h2>
                    <h2>Supabase</h2>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Skills
