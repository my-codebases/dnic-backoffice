import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1 className='mb-6 text-4xl font-bold'>Sistema Interno de Gestión</h1>
      <p className='text-xl'>Bienvenido al Sistema de Gestión de Usuarios y Turnos de la DNIC</p>
      <h3 className='mt-8 mb-2 text-3xl font-semibold'>Acceso Rápido:</h3>
      <ul>
        <li>
          <Link to='/users' className='inline-block py-1 text-xl font-medium no-underline text-sky-700 hover:text-sky-900'>
            Gestionar Usuarios
          </Link>
        </li>
        <li>
          <Link to='/users' className='inline-block py-1 text-xl font-medium no-underline pointer-events-none cursor-pointer text-gray-500'>
            Gestionar Turnos (próximamente)
          </Link>
        </li>
      </ul>
    </>
  )
}