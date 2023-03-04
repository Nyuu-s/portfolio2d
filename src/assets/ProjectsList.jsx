import ProjectItem from '../pages/projectItemList'

import ulearning1 from '../assets/images/ULearning1_mini.jpg'
import ue_default from '../assets/images/UE.jpg'
import TempleRun from '../assets/images/SnowTempleRun.jpg'
import arpa from '../assets/images/arpa.jpg'
import animelist from '../assets/images/animelist.jpg'
import gameengine_default from '../assets/images/gameengine.jpg'
import openglbase from '../assets/images/openglbase.jpg'
import openglbase_detail from '../assets/images/openglbase_detail.jpg'
import inpaint from '../assets/images/inpaint.jpg'
import hdr from '../assets/images/hdr.jpg'
import imagehdr from '../assets/images/imagehdr.jpg'
import maze from '../assets/images/maze.jpg'
import cms from '../assets/images/cms.png'
import animelist1 from '../assets/images/animelist.jpg'
import animelist2 from '../assets/images/1_animelist.jpg'
import portfolio3d from '../assets/images/portfolio3d.jpg'

let ProjectItems = [
    <ProjectItem id={0} Tags={["game", "cpp", "pers"]}  image={ulearning1} Title={"ULearning1"}>My first game</ProjectItem>,
    <ProjectItem id={1} Tags={["game", "cpp", "pers"]}  image={ue_default} Title={"ULearning2"}>My first multiplayer game</ProjectItem>,
    <ProjectItem id={2} Tags={["game", "cpp", "pers", "opengl"]}  image={gameengine_default} Title={"Infectious Engine"}>My own game engine project</ProjectItem>,
    <ProjectItem id={3} Tags={["game", "cpp", "uni", "opengl"]}  image={TempleRun} Title={"Snow Temple Run"}>Our own game engine and game project made during university</ProjectItem>,
    <ProjectItem id={4} Tags={["game", "cs", "uni"]}  image={arpa} Title={"ARPA"}>Augmented Reality Piano Assistant </ProjectItem>,
    <ProjectItem id={5} Tags={["app", "js", "pers"]}  image={animelist} Title={"AnimeList"}>Windows Application to list all series / anime you watched or want to watch. </ProjectItem>,
    <ProjectItem id={6} Tags={["opengl", "cpp", "pers"]}  image={openglbase} Title={"OpenGL Base"}>Basic setup to use OpenGL for other rendering project </ProjectItem>,
    <ProjectItem id={7} Tags={["cs", "uwp", "uni"]}  image={inpaint} Title={"Inpainting"}>Basic setup to use OpenGL for other rendering project </ProjectItem>,
    <ProjectItem id={8} Tags={["cpp", "uni"]}  image={hdr} Title={"Image HDR"}>Basic setup to use OpenGL for other rendering project </ProjectItem>,
    <ProjectItem id={9} Tags={["web", "js", "pers"]}  image={maze} Title={"Maze algorithms"}>Basic setup to use OpenGL for other rendering project </ProjectItem>,
    <ProjectItem id={10} Tags={["js", "web"]}  image={cms} Title={"Accessible CMS"}> R&D for programing a CMS producing websites that respects accessibility criterias </ProjectItem>,
    <ProjectItem id={11} Tags={["js", "web", "pers"]}  image={portfolio3d} Title={"Portfolio 3D"}> 3D Version of this portfolio </ProjectItem>,
]

const VideoFormat = {
    online: true,
    local: false
}

export let ProjectContent= {
    0:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/Nyuu-s/ULearning1" target="_blank" rel="noopener noreferrer">ULearning1</a>  </div> ,
        description: <div> This is my first game made with Unreal Engine. It's a thirdperson PvE game where you can break things and kill creatures, although this project was mostly to understand how unreal works so it isn't a complete fine-tuned game. You can download it on the github realeases <a className='hover:text-blue-500 text-blue-400 underline' href="https://github.com/Nyuu-s/ULearning1/releases/tag/1.0.0" target="_blank" rel="noopener noreferrer">here</a> to try it yourself if you wish.</div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>
                <div className='my-5 mx-auto w-2/3'> I made a simple Start menu to launch the actual game. The Goal is to kill the wolf in the dungeon. You can pick up several items like swords, gold, souls and hearts which affect your health. There is no uses to gold and souls currently beside highscore.</div>
                <video className="my-5 mx-auto w-2/3" autoPlay={false} loop={true} controls={true} src={"/videos/PJ12/StartGame.mp4"}></video> 
                <div className='my-5 mx-auto w-2/3'> Each Heart color have a different effect which can be tweaked in editor so each same color may affect your health with different values. Red ones increase your current health (Add 20 or more). Green ones increase your max health. Yellow ones increase both current and max health. Finally Purple ones set your current health to a value, could be 1 or 1000 depending on your luck :)   </div>
                <video className="my-5 mx-auto w-2/3" autoPlay={false} loop={true} controls={true} src={"/videos/PJ12/WeaponCombat.mp4"}></video> 
                <div className='my-5 mx-auto w-2/3'> I used animation blend spaces and motion warping for enemies attack so dodging must be done at the right moment. They are 3 type of enemy, paladins, insect and the wolf.  </div>
                <video className="my-5 mx-auto w-2/3" autoPlay={false} loop={true} controls={true} src={"/videos/PJ12/EnemyType2.mp4"}></video> 
                <video className="my-5 mx-auto w-2/3" autoPlay={false} loop={true} controls={true} src={"/videos/PJ12/BossFight_1.mp4"}></video> 
                <div className='my-5 mx-auto w-2/3'> On a side not I also exprimented feet inverse kinematics with a sphere trace </div>
                <video className="my-5 mx-auto w-2/3" autoPlay={false} loop={true} controls={true} src={"/videos/PJ12/Feet_IK.mp4"}></video> 
            </div>
    },
    1:{
        title: <div> <a className='hover:text-blue-500 underline' href="" target="" rel="noopener noreferrer">ULearning2</a>  </div> ,
        description: <div> This is my first Multiplayer game made with Unreal Engine. It's a thirdperson shooter game where you must kill your friends and capture points, this project was made to understand how Unreal OnlineSubsystem works. </div>,
        status: 0,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>
                <div className='my-5 mx-auto w-2/3'> This project is actually still on going and the repository is private for now but I'll set it to public eventually.</div>
                <div className='my-5 mx-auto w-2/3'> I 'm making a simple multiplayer plugin able to create Steam sessions and join them that I can then reuse in future projects. I've been learning how Unreal's replication system works even though it's not always clear what is already replicated by default. I've learned how to use rep notifies in c++ along with RPCs to call functions from a client on the server.</div>
            </div>
    },
    2:{
        title: <div> <a className='hover:text-blue-500 underline' href="" target="" rel="noopener noreferrer">Infectious Engine</a>  </div> ,
        description: <div> This is my own game engine project. After first doing a game engine for a university project, I decided to re build it from scratch without the time constraint of the university to build something cleaner. </div>,
        status: 2,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>
                <div className='my-5 mx-auto w-2/3'> This project was my main project until recently, I aimed for a game engine written in C++ using both OpenGL and Vulkan's rendering API. This game engine would then support a special game that would uses an EEG headset for inputs  (basiclly controlling the player with your mind !). Then as an optional challenge I would rewrite the game engine in rust to learn this interesting language. </div>
                <div className='my-5 mx-auto w-2/3'> Unfortuately I had to make a decision between focusing the job of Engine or Gameplay Programer and I always wanted to be in Gameplay so this project is currently in hiatus until I'm done learning Unreal engine (and found a job <span role="img" aria-label="dog">😉</span> ) </div>
            </div>
    },
    3:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/fds-napolitain/m2-temple-run" target="_blank" rel="noopener noreferrer">Snow Temple Run</a>  </div> ,
        description: <div> This is a university project I worked on with 2 of my classmates where the goal was to create a game engine with a game using this same engine. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>
                <div className='my-5 mx-auto w-2/3'> To do this, we used QT (C++) and OpenGl as a graphic API. Then, we chose to take the mobile game Temple Run, but on the theme of winter with a snowman. We also challenged ourselves to only move the background and obstacles and not the character. It's an endless game where the goal is to get the best score possible by avoiding ice cubes.  </div>
                <div className='my-5 mx-auto w-2/3'> The three snowballs of the snowman represent the number of remaining lives, each obstacle removing one life. However, it is still possible to recover a snowball that falls from the walls when only one life is left. </div>
                <div className='my-5 mx-auto w-2/3'> In this project, I was mainly involved in setting up the collision detection system, setting up the texture and lightening system and participated in the architecture of the scene graph of the engine. </div>
                <iframe className="mx-auto w-1/2 h-96 mt-10"  src="https://www.youtube.com/embed/nZomznO4QcE" title="Temple Run / Qt - OpenGL ES 3.0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
    },
    4:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/fds-napolitain/m2-projet-ar" target="_blank" rel="noopener noreferrer">Augmented Reality Piano Assistant</a>  </div> ,
        description: <div> This is a university project I worked on with 2 of my classmates, using Unity and a LeapMotion to detect the user's hands. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> With certain hand movements, you can zoom in/out on the piano or move along it. With the help of different techniques, such as quantization, we were able to reduce the imprecisions of the sensors and thus reduce accidental errors, such as double taps. It is also possible to visualize what chords are being played. Here are some demonstration videos of the final application (in French) </div>
                <iframe className="mx-auto w-2/4 "height={400} src="https://www.youtube.com/embed/EnPYldUcp3Q?list=PLvsOC5PoBqO5ggNxiqPKSkO_ZL5-JctbU" title="quantification"   allowFullScreen></iframe>
             
            </div>
    },
    5:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/Nyuu-s/animelistReact" target="_blank" rel="noopener noreferrer">Anime List</a>  </div> ,
        description: <div> This is an application listing various series/animes with various statistics. </div>,
        status: 0,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> I created an application using Javascript and the front-end frameworks React and Electron to create a Windows application able to list series watched or to be watched, as well as available languages, release dates, and other information. Initially, this application was intended for a friend, but it will eventually be usable by everyone. </div>
                <img className="mx-auto w-2/3 mt-10" src={animelist1} alt="capture ecran liste de serie" />
                <div className='my-5 mx-auto w-2/3'> A customization interface tab has been set up to change colors as desired and the main theme (dark or light) </div>
                <img className="mx-auto w-2/3 mt-10" src={animelist2} alt="capture menu theme et couleur" />

             
            </div>
    },
    6:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/Nyuu-s/OpenGl_base" target="_blank" rel="noopener noreferrer">OpenGL Base</a>  </div> ,
        description: <div> This is a basic rendering environment with Opengl. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> The goal was to discover and understand how rendering a simple scene works with OpenGL through the FreeCodeCamp tutorial. I later wanted to use it as a base for various exercises or projects without having to rewrite the basics every time. </div>
                <img className="mx-auto w-2/3 mt-10" src={openglbase_detail} alt="capture scene 3d" />


             
            </div>
    },
    7:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/fds-napolitain/m1-image-inpainting" target="_blank" rel="noopener noreferrer">Inpainting</a>  </div> ,
        description: <div> This is an university project consisting of an application that performs image reconstruction made with a classmate. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> Our aim was to develop an application that can take an image as input and select the areas to be repainted in order to reconstruct or erase elements of the image.  </div>
                <div className='my-5 mx-auto w-2/3'>Our initial approach is to calculate the average of the surrounding pixels. We also discovered another method called Fast Marching Method (FMM) that promises significantly better results while remaining performant, but we didn't have time to implement it. To select an area to paint, just click on a pixel of the image and change the sensitivity, that is, the color variance detection, using the mouse wheel. </div>
                <video className="my-5 mx-auto w-2/3" controls={true} autoPlay={true} loop={true} src='/videos/pj_0_inpainting.mov'></video>


             
            </div>
    },
    8:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/fds-napolitain/m2-image-hdr" target="_blank" rel="noopener noreferrer">Image HDR</a>  </div> ,
        description: <div> This is an university project of an application to generate wide-range (HDR) images in astrophotography made with a classemate. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> Our project was to create an application that could take in a night sky image as input and apply different HDR algorithms to enhance it.   </div>
                <div className='my-5 mx-auto w-2/3'>We used Qt to create an easy-to-use interface, and we implemented different HDR algorithms using openCV, such as those of Robertson, Debevec and Mertens.    </div>
                <img className="mx-auto w-1/2 mt-10" src={hdr} alt="poster fonctionnement hdr" />
                <div className='my-5 mx-auto w-2/3'>We also tested several noise reduction methods, which is a common problem in astrophotography, first by averaging the images and then using a convolutional neural network. </div>
                <div className='my-5 mx-auto w-2/3'>Finally, our results were quite satisfactory and we were able to develop an application that offered different options for tonal mapping and HDR algorithms to produce an enhanced image. Here is the final poster that explains how me made the application. (in French) </div>
                <img className="mx-auto w-1/2 mt-10" src={imagehdr} alt="poster fonctionnement hdr" />
             
            </div>
    },
    9:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/Nyuu-s/labyJs" target="_blank" rel="noopener noreferrer">Maze Algorithms</a>  </div> ,
        description: <div> This is a simple project that consists of two diferrent maze generator algorithms. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> This is a small program written with the p5.js framework that generates a maze, the goal being to experiment with different algorithms including one using 'Backtrack' and another using recursive division of space.   </div>
                <video className="my-5 mx-auto w-2/3" controls autoPlay={true} loop={true} src='/videos/pj_0_labyjs.mp4'></video>
             
            </div>
    },
    10:{
        title: <div> <a className='hover:text-blue-500 underline' href="" target="" rel="noopener noreferrer">Accessible CMS</a>  </div> ,
        description: <div> This is a database project listing all web accessibility criteria. </div>,
        status: 3,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> During my final internship, I developed a project aimed at preparing the development of an accessible website producing CMS. </div>
                <div className='my-5 mx-auto w-2/3'> To do this, I created an application with a database that includes all accessibility criteria from WCAG and an API that will allow this future CMS to request validations or recommendations regarding the user's ongoing production.  </div>
                <div className='my-5 mx-auto w-2/3'> This project showed me how important accessibility is on the web aswell as in video games. Unfortunately, due to the nature of the project, I cannot show anything here.  </div>

                
             
            </div>
    },
    11:{
        title: <div> <a className='hover:text-blue-500 underline' href="https://github.com/Nyuu-s/portfolio3d" target="" rel="noopener noreferrer">Portfolio 3D</a>  </div> ,
        description: <div> This is this portfolio but made with ThreeJS and ReactJS. <a href="http://3d.edgar.jacquemoud.com" className='text-sky-500 underline hover:text-blue-500' target="_blank" rel="noopener noreferrer">Visit here</a></div>,
        status: 0,
        videosFormat: VideoFormat.local,
        videos: 
            <div className='my-5 mx-auto full text-white'>

                <div className='my-5 mx-auto w-2/3'> It's basically the same portfolio with more interactivity, I will embed some games that I will make in the future in the scene.   </div>
                <div className='my-5 mx-auto w-2/3'> It's also currently both in French and in English whereas this portfolio is only in english.  </div>
                <div className='my-5 mx-auto w-2/3'> It's made of two scene, the default one is a room with some clickable elements that will triggers cinematics, games or events. The other Scene is the projects scene where you can find my projects in space around the planet Earth. </div>
                <div className='my-5 mx-auto w-2/3'> You can scroll down in the default scene to see the about, contact and cv pages, or just navigate with the navbar </div>

            </div>
    }

}



export default ProjectItems