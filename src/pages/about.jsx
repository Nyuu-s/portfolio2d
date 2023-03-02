import React from 'react'

function about() {
  return (
    <div>
        <div className='text-white p-10'>
          <div className=' text-lg'>
            Hi, my name is Edgar, I am 23 years old and I am an application developer. I have been passionate about computer science since I was young and especially about video games. My goal is to work in the video game industry as a gameplay developer or as an engine developer.
          </div>
         
            <h3 className='text-xl font-bold my-5'> I)  My journey</h3> 
            <div>
                <p className='my-2'>Having played video games when I was younger, I quickly found myself wanting to be on the other side of the mirror and create games, a way to tell stories and express my creativity in a more immersive and interactive way than conventional media.</p>
                <p className='my-2'>I started learning python in highschool with some algorithms puzzles then I started my studies in Lyon where I learned object oriented programing basics such as classes, inheritence and polymorphism. It was with C# and Java which are syntactically close and I got my Bac + 2 (HND).</p>
                <p className='my-2'>Then, I continued in Rennes for my Bachelor's degree where I learned more about computer science in general with some famous sorting algorithms, or how compilers works.I discovered the C and C++ programming languages there.</p>   
                <p className='my-2'>Eventually I completed my journey in Montpellier with a Master's degree (Images and Games) where I learned more about Game engines, the rendering pipeline with opengl, agents oriented programming for AI, and image processing techniques. Most of the work done there was in C++</p>

            </div>
            <h1 className='text-xl font-bold my-5'>II) My interests</h1>
            <h3 className='text-lg font-bold my-2'>Programming</h3>
            <p>Among the activities I enjoy, programming holds the gold medal, I love learning new languages and reinforcing my skills in those I already know. For me, programming is a series of challenges and puzzles to solve. I especially enjoy finding solutions to complex problems.</p>
            
            <h3 className='text-lg font-bold mb-2 mt-5 '>Sciences</h3>
            <p className='my-2'>I am absolutely amazed by the sciences that represent for me the salvation of humanity. The areas I love the most, even though they often go far beyond my skills, are astronomy and everything related to space and the infinitely large. In a second time I love neurosciences and everything related to understanding the human brain and digitizing consciousness / mind. And finally I am also interested in quantum physics which plays a major role in the infinitely large and which contains so many mysteries.</p>
            
            <h3 className='text-lg font-bold mb-2 mt-5 '>Others</h3>
            <p>I love learning new things on various topics but I remain human above all, so yes, I also like playing video games, watching movies and series, and reading mangas!</p>

            <div className='w-full h-80 text-center mt-10 '>

            </div>
           
        </div>
      </div>
  )
}

export default about