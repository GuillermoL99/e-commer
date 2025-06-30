import { useState, useEffect } from "react";
import { obtenerPerfil } from "../api/auth";

export function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    // Cargar perfil solo si hay token
    obtenerPerfil()
      .then(setUser)
      .catch(() => {
        setUser(null);
        localStorage.removeItem("token");
      });
  }, []);

  const login = (usuario) => setUser(usuario);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}