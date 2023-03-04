import React from 'react'

function contact() {

  return (
    <div>
        <div className='my-10 p-10 text-white'>
            <h3 className='p-5 text-xl '>Here are my different contact methods and other useful links: </h3>
            <div className='flex pl-5 flex-col items-start'>
        
                <div className='flex   font-mono p-2'> <span className='mt-1 px-2'></span> email:  edgar.jacquemoud99@gmail.com </div>
                <div className='flex   font-mono  p-2  dark:text-cyan-300 hover:text-blue-600'> <span className='mt-1 px-2'></span>  <a target='_blank' rel="noreferrer" href={"https://www.linkedin.com/in/edgargamedev/"}>Linkedin: linkedin.com/in/edgargamedev/</a></div>
                <div className='flex   font-mono  p-2  dark:text-cyan-300 hover:text-blue-600'> <span className='mt-1 px-2'></span>   <a target='_blank' rel="noreferrer" href={"https://github.com/Nyuu-s"}>Github: https://github.com/Nyuu-s</a></div>
            </div>
            <h3 className='p-5 text-xl'>Other infos</h3>
            <div className='flex pl-5 flex-col items-start'>
                    <div className='flex   font-mono p-2'> <span className='mt-1 px-2'></span>  <a href="http://3d.edgar.jacquemoud.com" target="_blank" rel="noopener noreferrer">portfolio 3D experience</a> </div>
                    <div className='flex   font-mono  p-2  hover:text-blue-600'> <span className='mt-1 px-2'></span>   <a target='_blank' rel="noreferrer" href={"/EdgarCV.pdf"}>CV (French)</a></div>
                    <div className='flex   font-mono  p-2  hover:text-blue-600'> <span className='mt-1 px-2'></span>   <a target='_blank' rel="noreferrer" href={"/EdgarCV-EN.pdf"}>CV (English)</a></div>
            </div>
    </div>

    </div>
  )
}

export default contact