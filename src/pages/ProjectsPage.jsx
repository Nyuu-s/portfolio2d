        import React, {useEffect, useState} from 'react'
        import { useParams } from 'react-router-dom';
        import ProjectItems from '../assets/ProjectsList'
        import {TagsAvailable, TagColor} from '../assets/Tags'

        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        }

        function FilterByTags(CurrentArray, CurrentTags, SetDisplay) {
          let toDisplay = []
     
          if(CurrentTags.length <=0) return
          for (const project of CurrentArray) {
            for (const key in CurrentTags) {
                if (!toDisplay.includes(project) && project.props["Tags"].includes(CurrentTags[key])) {
                  toDisplay.push(project);
                }
              }
          }
          SetDisplay(toDisplay)
        }

        function AddTag(TagKey, ActiveTags, AddTagFunction) {
          let index = ActiveTags.findIndex(item => item == TagKey)
          let temp = [...ActiveTags]
          if(index > -1)
          {
            temp.splice(index, 1)
          }
          else
          {
            temp.push(TagKey)
          }
          AddTagFunction(() => temp)
        }
        
        function Projects() {

          const {tagnames} = useParams()
          const [ActiveArray, setActiveArray] = useState(ProjectItems)
          const [ActiveTags, setActiveTags] = useState([])
          // const TagsAvailableArray =


          useEffect(() => {
            let tagArray = []
            if(tagnames)
            {
              for (const tag of tagnames.split('&')) {
                let TagValue = TagsAvailable[tag]
                if(TagValue)
                {
                  tagArray.push(tag);
                }          
              }
              setActiveTags(tagArray)
            }
          }, [])
          
  
          useEffect(() => {
            if(ActiveTags.length > 0)

              FilterByTags(ProjectItems, ActiveTags, setActiveArray)
            else
              setActiveArray(ProjectItems)
          }, [ActiveTags])
          

          
        
          return (
            <div className='mt-32 text-white'>
              <div className='place-items-center flex flex-wrap justify-between mx-auto gap-4 w-1/2 text-lg '>
                {Object.keys(TagsAvailable).map((item, i) => <div key={i} className={`shadow-lg ${TagColor[item]} text-black  font-semibold text-sm rounded-full px-4`} ><button  onClick={() => { AddTag(item, ActiveTags, setActiveTags)}}>{TagsAvailable[item]}</button> </div>)}
              </div>
              <div className='flex flex-wrap mx-auto mt-5 justify-center w-1/2'>
                {
                    ActiveTags && ActiveTags.map(tag => <div key={tag} onClick={() => { AddTag(tag, ActiveTags, setActiveTags)}} className={`px-2 mt-1 mx-2 rounded-full text-sm h-5 cursor-default hover:cursor-pointer text-black font-semibold  ${TagColor[tag]}`}>{TagsAvailable[tag]}</div> )
                }
              </div>
              <div className='p-10  w-full'>
                  <ul>
                   {
                    ActiveArray.map((item, i) => (<li key={i}>{item}</li>))
                   
                   }
                  </ul>
              </div>

            </div>
          )
        }
        
        export default Projects