import { useState } from 'react'
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import Projects from './pages/ProjectsPage';
import Contact from './pages/contact';
import About from './pages/about';
import ProjectDetails from './pages/ProjectDetails';
function App() {
  const {pathname} = useLocation()

  return (
    <div className="App">

      <nav className='mx-auto w-1/2 p-5 text-white font-semibold font-mono text-2xl'>
        <div className='links'>

          <ul className='flex sm:flex-row flex-col mt-10 justify-between gap-11 '>
            <li><NavLink to={"/about"} className={({ isActive }) => isActive ? "underline" : ""}> About me</NavLink></li>
            <li><NavLink to={"/contact"} className={({ isActive }) => isActive ? "underline" : ""}>Contact & Infos</NavLink></li>
            <li><NavLink to={"/"}  className={({ isActive }) => isActive || pathname.includes("tags") ? "underline" : ""} >Projects</NavLink></li>
          </ul>
        </div>
      </nav>




      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Projects /> } /> 
        <Route path="/tags/:tagnames" element={<Projects /> } />
        <Route path="/tags/" element={<Projects /> } />
        <Route path="/project/details/:id" element={<ProjectDetails /> } />

      
      </Routes>
    </div>
  )
}

export default App
