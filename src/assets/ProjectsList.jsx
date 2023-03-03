import ProjectItem from '../pages/projectItemList'

import ulearning1 from '../assets/images/ULearning1_mini.jpg'
import ue_default from '../assets/images/UE.jpg'
import TempleRun from '../assets/images/SnowTempleRun.jpg'
import arpa from '../assets/images/arpa.jpg'
import animelist from '../assets/images/animelist.jpg'
import gameengine_default from '../assets/images/gameengine.jpg'
import openglbase from '../assets/images/openglbase.jpg'
import inpaint from '../assets/images/inpaint.jpg'
import hdr from '../assets/images/hdr.jpg'
import maze from '../assets/images/maze.jpg'
import cms from '../assets/images/cms.png'
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
    }

}



export default ProjectItems