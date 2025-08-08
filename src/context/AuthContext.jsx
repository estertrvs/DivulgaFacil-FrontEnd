import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioId = localStorage.getItem("usuarioId");
    const tipo = localStorage.getItem("tipo");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario({
          email: decoded.sub,
          role: decoded.role,
          id: usuarioId,
          tipo: tipo,
        });
      } catch (err) {
        console.error("Token inválido", err);
        logout(); 
      }
    }
  }, []);

  const login = (token, usuarioId, tipo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuarioId", usuarioId);
    localStorage.setItem("tipo", tipo);

    const decoded = jwtDecode(token);
    setUsuario({
      email: decoded.sub,
      role: decoded.role,
      id: usuarioId,
      tipo: tipo,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("tipo");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
