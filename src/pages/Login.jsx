import { useLogin } from "./../hooks/useLogin";

import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="flex w-full h-screen items-stretch">
      <section className="p-12 flex flex-col justify-center items-center">
        <form
          className="flex w-72 flex-col gap-4 items-stretch"
          onSubmit={handleLoginSubmit}
        >
          <h1 className='text-3xl font-medium text-center'>Sistema Interno de Gestión</h1>
          <h3 className='text-xl text-center'>Acceso Funcionarios</h3>
          <label htmlFor="username" className="form_label">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-2 px-3 bg-white text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          />

          <label htmlFor="password" className="form_label">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-3 bg-white text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          />

          <button type="submit" className="w-full py-2 bg-sky-600 text-white font-semibold focus:outline-none rounded-md">
            {isPending ? <ClipLoader color="#ffffff" size={16} /> : "Ingresar" }
          </button>

          {error && (
            <Error
              error={error}
              errorColor={"text-primaryOrange"}
              errorSize={"text-lg"}
            />
          )}
        </form>
      </section>
      <section className="flex-auto bg-login bg-no-repeat bg-cover bg-center"></section>
    </main>
  )
}