import React, { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletedUsername, setDeletedUsername] = useState('');
  const [userToDisplay, setUserToDisplay] = useState(null);

  async function deleteUser(username) {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(
      `http://localhost:8080/backoffice/users/${username}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + user["user_token"]
        },
      },
    );

    if (!response.ok) {
      console.error('Error deleting user', response);
    } else {
      setDeletedUsername(username);
      setTimeout(() => {
        setUsers(users.filter(user => user.username !== username));
      }, 2000);
    }
  }

  function handleViewUser(user) {
    setUserToDisplay(user);
  }

  function handleModalClose() {
    setUserToDisplay(null);
  }

  useEffect(() => {
    async function fetchUsers() {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        "http://localhost:8080/backoffice/users",
        {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + user["user_token"]
          },
        },
      );
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  function handleInputChange(event) {
    setCurrentPage(1);
    setSearchTerm(event.target.value);
  }

  function addDelimitersTo(username) {
    return username.replace(/(\d{1})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
  }

  return (
    <>
      <h1 className='mb-6 text-4xl font-bold'>Gestión de Usuarios</h1>
      <section id='search' className='mt-8 mb-2 flex items-center gap-6'>
        <h3 className='text-xl'>Filtrar por Cédula:</h3>
        <div className='relative'>
          <input
            type='text'
            placeholder='Buscar'
            className='p-2 shadow appearance-none border rounded min-w-64 py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline pl-10'
            onChange={handleInputChange}
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 cursor-default">search</span>
        </div>
      </section>
      <section id='search-results' className='mt-8 mb-2'>
        <table id="users-list" className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>CÉDULA DE IDENTIDAD</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>APELLIDO</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>NOMBRE</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>FECHA DE ACTUALIZACIÓN</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 row-container'>
            {users
              .filter(user => user.username.startsWith(searchTerm))
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((user) => (
                <React.Fragment key={user.username}>
                  <tr className={`h-16 text-gray-900 text-sm ${deletedUsername === user.username ? 'deleted-row' : ''}`}>
                    <td className='px-6 py-4 whitespace-nowrap'>{addDelimitersTo(user.username)}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.last_name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.first_name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{user.last_updated_date}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <button onClick={() => handleViewUser(user)}><span className="material-symbols-outlined mr-4">visibility</span></button>
                      <button onClick={() => deleteUser(user.username)}><span className="material-symbols-outlined">delete</span></button>
                    </td>
                  </tr>
                  {deletedUsername === user.username && (
                    <tr className='h-16 text-md bg-slate-200'>
                      <td colSpan='5' className='px-6 py-4 text-center whitespace-nowrap fade-in'>Usuario eliminado</td>
                    </tr>
                  )
                  }
                </React.Fragment>
              ))}
          </tbody>
        </table>
        {
          users.length > itemsPerPage &&
          (<div className='pagination flex justify-between space-x-2 mt-4'>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white focus:outline-none ${currentPage === 1 ? 'bg-gray-400 cursor-default' : 'bg-slate-600 rounded hover:bg-slate-800 cursor-pointer'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(users.filter(user => user.username.startsWith(searchTerm)).length / itemsPerPage)}
              className={`px-4 py-2 text-white focus:outline-none ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'bg-gray-400 cursor-default' : 'bg-slate-600 rounded hover:bg-slate-800 cursor-pointer'}`}
            >
              Next
            </button>
          </div>)
        }
        {
          userToDisplay &&
          (
            <div className='fixed w-full h-full inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-60'>
              <div className="px-8 py-6 min-w-96 max-w-md z-50 rounded-lg shadow-lg bg-white overflow-y-auto">
                <div className='flex justify-between items-center gap-6 mb-6 pb-2 border-b border-gray-400'>
                  <h4 className='text-sky-700 text-2xl font-semibold'>Detalles del Usuario</h4>
                  <button className="hover:text-gray-500 align-middle" onClick={handleModalClose}>
                    <span className="block material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className='flex flex-col justify-start items-start gap-6 text-lg font-medium'>
                  <p>
                    <span className="material-symbols-outlined user-details-icon mr-4 align-text-bottom">id_card</span>
                    {userToDisplay.username || 'N/A'}
                  </p>
                  <p>
                    <span className="material-symbols-outlined user-details-icon mr-4 align-text-bottom">person</span>
                    {(userToDisplay.first_name && userToDisplay.last_name) ? `${userToDisplay.first_name} ${userToDisplay.last_name}` : 'N/A'}
                  </p>
                  <p>
                    <span className="material-symbols-outlined user-details-icon mr-4 align-text-bottom">mail</span>
                    {userToDisplay.email || 'N/A'}
                  </p>
                  <p>
                    <span className="material-symbols-outlined user-details-icon mr-4 align-text-bottom">smartphone</span>
                    {userToDisplay.phone || 'N/A'}
                  </p>
                  <div className='w-full grid grid-cols-2 gap-4'>
                    <div>
                      <h6 className='user-details-fieldname'>Vencimiento C.I.</h6>
                      <p>{userToDisplay.id_card_expiration_date || 'N/A'}</p>
                    </div>
                    <div>
                      <h6 className='user-details-fieldname'>Vencimiento Pasaporte</h6>
                      <p>{userToDisplay.passport_expiration_date || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 items-center gap-x-8 text-gray-400 text-sm border-t border-gray-300 pt-4">
                    <h6 className='text-start'>Fecha Creación</h6>
                    <p className='text-end'>{userToDisplay.created_date || 'N/A'}</p>
                    <h6 className='text-start'>Última actualización</h6>
                    <p className='text-end'>{userToDisplay.last_updated_date || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </section>
    </>
  )
}