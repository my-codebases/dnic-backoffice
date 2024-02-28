import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

import Login from './pages/Login';
import Section from './pages/Section';

import './App.css';
import { sectionsArray } from './pages/Section.jsx';

export default function App() {
  const { user, authIsReady } = useAuthContext();
  
  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ user ? <Navigate to="/home" /> : <Navigate to="/login" /> } />
            <Route path="/login" element={ user ? <Navigate to="/home" /> : <Login /> } /> 
            {sectionsArray.map((section) => (
              <Route
                key={section}
                path={`/${section}`}
                element={ user ? <Section sectionName={section} /> : <Navigate to="/login" /> }
              />
            ))}
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}
