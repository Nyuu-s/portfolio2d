
import React, { useState } from 'react'

function hasAnyActiveTags(TagsArray, ActiveTags) {
    if(TagsArray.lenght <= 0) return true;

    for (const key in TagsArray) {
        if(ActiveTags[key])
            return true
    }
    return false
}

function project({Tags}) {
    const [ActiveTags, setActiveTags] = useState()
    

  return (
    <div className='flex'>
        <div>image</div>
        <div className='mx-5'>
            InfoBox
            <div>Title</div>
            <div>Description </div>
            <div>Tags: {Tags}</div>
        </div>
    </div>
  )
}

export default project