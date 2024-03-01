import { useLogin } from "./../hooks/useLogin";

import { useState, useRef, useEffect } from 'react';
import { ClipLoader } from "react-spinners";

export default function Login() {
  const usernameRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();


  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    await login(username, password);
  };

  return (
    <main className="flex w-full h-screen overflow-y-clip items-stretch">
      <section className="p-12 flex flex-col justify-center items-center">
        <form
          className="relative flex w-72 flex-col gap-6 items-stretch"
          onSubmit={handleLoginSubmit}
        >
          <h1 className='text-3xl font-medium text-center'>Sistema Interno de Gestión</h1>
          <h3 className='text-xl text-center'>Acceso Funcionarios</h3>
          <label htmlFor="username" className="-mb-4">Usuario</label>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-2 px-3 bg-white text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="on"
          />

          <label htmlFor="password" className="-mb-4">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-3 bg-white text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            type="submit"
            className={`${username && password ? "bg-sky-600 text-white" : "bg-gray-300 text-gray-400 cursor-default"} w-full mt-6 py-2 font-semibold focus:outline-none rounded-md`}
          >
            {isPending ? <ClipLoader color="#ffffff" size={16} /> : "Ingresar" }
          </button>

          {
            error && 
            <p className={`absolute -bottom-12 w-full text-center text-lg font-bold`}>Error : {error}</p>
          }
        </form>
      </section>
      <section className="flex-auto bg-login bg-no-repeat bg-cover bg-center"></section>
    </main>
  )
}