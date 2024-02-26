import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/users">Usuarios</Link>
      <Link to="/agenda" className="disabled">Agenda</Link>
      <Link to="/settings" className="disabled">Settings</Link>
    </nav>
  )
}