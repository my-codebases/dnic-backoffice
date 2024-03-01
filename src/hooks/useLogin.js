import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    setIsPending(true);
    setError(null);

    if (username === "admin" && password === "admin") {
      localStorage.setItem("user", JSON.stringify({ username: "admin", "user_token": "admin"}));
      localStorage.setItem("url", "https://private-10044-dnicbackoffice.apiary-mock.com");
      dispatch({ type: "LOGIN", payload: { username: "admin", "user_token": "admin" } });
      navigate("/home");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      },
    );

    setIsPending(false);
    
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/home");
      return;
    }

    switch (response.status) {
      case 403:
        setError("Contraseña incorrecta");
        break;
      case 404:
        setError("Usuario no encontrado");
        break;
      default:
        setError("Ocurrió un error. Inténtelo nuevamente más tarde");
        break;
    }
  };

  return { login, isPending, error };
};