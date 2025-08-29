import React from 'react'

const Skills = () => {
  return (
    <div id="skills" className="container pt-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-20 text-center md:text-left items-center">
        <div>
          <h3 className="text-3xl font-bold">
            Technologies I work with:
          </h3>
          <p className="text-charcoalLight pt-2">
            As a junior developer, I am always learning new technologies and keen to find new ways to improve the websites and applications that I build. I currently have experience with a variety of technologies and tools for web development. Here are some of the key ones:
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 text-orange dark:text-green text-3xl">
            <div className="space-y-2">
              <h2>CSS</h2>
              <h2>HTML</h2>
              <h2>JavaScript</h2>
              <h2>Node.js</h2>
            </div>
            <div className="space-y-2">
              <h2>Typescript</h2>
              <h2>React</h2>
              <h2>Next.js</h2>
              <h2>Supabase</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills