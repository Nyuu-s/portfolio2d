import { useState } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Projects from './pages/Projects';
import Contact from './pages/contact';
import About from './pages/about';
import ProjectDetails from './pages/ProjectDetails';
function App() {


  return (
    <div className="App">

      <nav className='mx-auto w-1/2 p-5 text-white text-xl'>
        <div className='links '>
          <ul className='flex justify-between '>
            <li><Link to={"/about"}>About me</Link></li>
            <li><Link to={"/contact"}>Contact & Infos</Link></li>
            <li><Link to={"/"}>Projects</Link></li>
          </ul>
        </div>
      </nav>




      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Projects /> } /> 
        <Route path="/tags/:tagnames" element={<Projects /> } />
        <Route path="/tags/" element={<Projects /> } />
        <Route path="/project/details" element={<ProjectDetails /> } />

      
      </Routes>
    </div>
  )
}

export default App
