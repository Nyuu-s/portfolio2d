
import React, { useState } from 'react'

import {TagsAvailable, TagColor} from '../assets/Tags'
import { useNavigate } from "react-router-dom";


function project({Tags, Title, url, image, ...props}) {
    const [ActiveTags, setActiveTags] = useState()
    const navigate = useNavigate();

  return (
    <div className='flex mt-10 cursor-auto hover:cursor-pointer hover:bg-gray-800 ' onClick={() => {
        navigate("/project/details/"+props.id)
    }}>
        <div className='w-1/5'><img className='rounded-lg' src={image} alt="img" /></div>
        <div className='mx-5 '>
            
            <div className='text-lg font-semibold'>{Title}</div>
            <div> {props.children} </div>
            <div className='flex mt-5 flex-wrap'>Tags: 
                {
                    Tags && Tags.map(tag => <div key={tag} className={`px-2 mt-1 mx-2 rounded-full text-xs text-center h-5 text-black font-semibold  ${TagColor[tag]}`}>{TagsAvailable[tag]}</div> )
                }
            </div>
        </div>
    </div>
  )
}

export default project