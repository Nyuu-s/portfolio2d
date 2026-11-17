import { Routes, Route, useLocation, NavLink  } from "react-router-dom";
import Projects from './pages/ProjectsPage';
import Contact from './pages/contact';
import About from './pages/about';
import ProjectDetails from './pages/ProjectDetails';

import { lazy } from 'react'


function App() {
  const {pathname} = useLocation()
  
  return (
    <div className="App">

    <nav className="page pt-10 pb-6 text-white font-mono font-semibold">
      <ul className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-lg sm:text-2xl">
        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'underline' : '')}>About me</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'underline' : '')}>Contact & Infos</NavLink></li>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive || pathname.startsWith('/project') ? 'underline' : '')}>
            Projects
          </NavLink>
        </li>
      </ul>
    </nav>




      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About birthYear={1999} />} />
        <Route path="/" element={<Projects /> } /> 
        <Route path="/tags/:tagnames" element={<Projects /> } />
        <Route path="/tags/" element={<Projects /> } />
        <Route path="/project/details/:id" element={<ProjectDetails /> } />

      </Routes>
    </div>
  )
}

export default App
