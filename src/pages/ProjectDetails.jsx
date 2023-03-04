import React from 'react'
import {useParams} from "react-router-dom";
import {ProjectContent} from '../assets/ProjectsList'
const status = {
  "on": "In progress..",
  "off": "Cancelled!",
  "hiatus": "On Hiatus",
  "done" : "Done."
}

const statusMap = {
  0: <div className='text-status-on px-2'>{status.on}</div>,
  1: <div className='text-status-off px-2'>{status.off}</div>,
  2: <div className='text-status-hiatus px-2'>{status.hiatus}</div>,
  3: <div className='text-status-done px-2'>{status.done}</div>
}

const getDetails = (id) => {
  return ProjectContent[id]
}

function ProjectDetails(props) {
  const {id} = useParams()
  const details = getDetails(id)

  return (
    <div className='text-white my-10  mx-auto'>
      <h1 className='flex font-bold  justify-center w-full text-lg'>{details.title} <div>{statusMap[details.status]}</div></h1>
      
      <div className='my-5 mx-auto w-2/3'>{details.description}</div>
      <div>{details.videos}</div>
  </div>
  )
}

export default ProjectDetails