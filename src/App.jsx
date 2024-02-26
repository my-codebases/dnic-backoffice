import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Section from './pages/Section'

import './App.css'

const sections = ['home', 'users', 'agenda', 'settings']

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {sections.map((section) => (
            <Route path="/{section}" element={<Section sectionName={section} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}
