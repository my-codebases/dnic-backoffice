import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";

export default function Navbar({sections}) {
  const { logout } = useLogout();

  return (
    <>
      <ul id="nav-links">
        {Object.keys(sections).map(sectionName => {
          const isDisabled = sections[sectionName].disabled;
          return (
          <li key={sectionName}>
            <Link to={!isDisabled ? `/${sectionName}` : '#'} className={`block px-6 py-2 mb-2 font-medium no-underline ${isDisabled ? 'pointer-events-none cursor-pointer text-gray-500' : 'text-sky-700 hover:text-sky-900 hover:bg-slate-400'}`}>
              <span className='material-symbols-outlined align-middle'>{sections[sectionName].link.icon}</span>
              <span className='align-middle'>&nbsp;{sections[sectionName].link.text}</span>
            </Link>
          </li>
        )})}
      </ul>
      <div id="sign-out-button">
        <Link onClick={logout} className="block px-6 py-2 mb-2 font-medium no-underline text-sky-700 hover:text-sky-900 hover:bg-slate-400">
          <span className='material-symbols-outlined align-middle'>exit_to_app</span>
          <span className='align-middle'>&nbsp;Cerrar sesión</span>
        </Link>
      </div>
    </>
  )
}