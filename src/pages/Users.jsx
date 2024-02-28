import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  async function deleteUser(username) {
    const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(
        `/backoffice/users/${username}`,
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
      setUsers(users.filter(user => user.username !== username));
    }
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
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>CÉDULA DE IDENTIDAD</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>APELLIDO</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>NOMBRE</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>FECHA DE ACTUALIZACIÓN</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users
              .filter(user => user.username.startsWith(searchTerm))
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((user) => (
              <tr key={user.username}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{addDelimitersTo(user.username)}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.last_name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.first_name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.last_updated_date}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'><button onClick={() => deleteUser(user.username)}><span className="material-symbols-outlined">delete</span></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length > itemsPerPage &&
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
      </div>)}
      </section>
    </>
  )
}