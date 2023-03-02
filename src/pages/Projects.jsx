        import React, {useEffect, useState} from 'react'
        import { Link, useParams } from 'react-router-dom';
        import Project from './project'

        function FilterByTags(CurrentArray, CurrentTags, SetDisplay) {
          let toDisplay = []
          if(CurrentTags.length <=0) return
          for (const project of CurrentArray) {
            if(!toDisplay.includes(project))
            for (const key in CurrentTags) {
              if (project.props["Tags"].includes(CurrentTags[key])) {
                toDisplay.push(project);
                
              }
            }
          }
          SetDisplay(toDisplay)
        }

        function AddTag(Tag, ActiveTags, AddTagFunction) {
          let index = ActiveTags.findIndex(item => item == Tag)
          let temp = [...ActiveTags]
          if(index > -1)
          {
            temp.splice(index, 1)
          }
          else
          {
            temp.push(Tag)
          }
          AddTagFunction(() => temp)
        }
        
        function Projects() {

          const {tagnames} = useParams()
          
          let arr = [<Project Tags={["Games", "C++"]}/>,<Project Tags={["Web", "Javascript"]}/>,<Project Tags={["Web", "C#"]}/>,<Project Tags={["Web", "C++", "OpenGL"]}/>,<Project Tags={["Games", "Personnal"]}/>]
          const [ActiveArray, setActiveArray] = useState(arr)
          const [ActiveTags, setActiveTags] = useState([])
          const TagsAvailable = {
            game: "Games",
            cs: "C#",
            web: "Web",
            app: "Apps",
            cpp: "C++",
            js: "Javascript",
            opengl: "OpenGL",
            pers: "Personnal",
            uni: "University"
          }

          useEffect(() => {
            let tagArray = []
            if(tagnames)
            {
              for (const tag of tagnames.split('&')) {
                let TagValue = TagsAvailable[tag]
                if(TagValue)
                {
                  tagArray.push(TagValue);
                }          
              }
              setActiveTags(tagArray)
            }
          }, [])
          
  
          useEffect(() => {
            console.log(ActiveTags);
            if(ActiveTags.length > 0)
              FilterByTags(arr, ActiveTags, setActiveArray)
            else
              setActiveArray(arr)
          }, [ActiveTags])
          

          
        
          return (
            <div className='mt-32 text-white'>
              <div className='place-items-center grid grid-cols-3 gap-4 w-full text-lg '>
                <div><button onClick={() => { AddTag(TagsAvailable.game, ActiveTags, setActiveTags)}}>Game</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.web, ActiveTags, setActiveTags)}}>Web</button></div>
                <div><button onClick={() => { AddTag(TagsAvailable.app, ActiveTags, setActiveTags)}}>Apps</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.cpp, ActiveTags, setActiveTags)}}>C++</button>  </div>
                <div><button onClick={() => { AddTag(TagsAvailable.cs, ActiveTags, setActiveTags)}}> C#</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.js, ActiveTags, setActiveTags)}} >Javascript</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.opengl, ActiveTags, setActiveTags)}} >OpenGL</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.pers, ActiveTags, setActiveTags)}} >Personnal</button> </div>
                <div><button onClick={() => { AddTag(TagsAvailable.uni, ActiveTags, setActiveTags)}} >University</button> </div>
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