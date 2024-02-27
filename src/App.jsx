import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Section from './pages/Section'

import './App.css'
import { sectionsArray } from './pages/Section.jsx';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {sectionsArray.map((section) => (
            <Route key={section} path={`/${section}`} element={<Section sectionName={section} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}
