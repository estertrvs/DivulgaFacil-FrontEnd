import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const usuarioId = Cookies.get("usuarioId");
    const tipo = Cookies.get("tipo");

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
    Cookies.set("token", token, { secure: true, sameSite: "Strict" });
    Cookies.set("usuarioId", usuarioId, { secure: true, sameSite: "Strict" });
    Cookies.set("tipo", tipo, { secure: true, sameSite: "Strict" });

    const decoded = jwtDecode(token);
    setUsuario({
      email: decoded.sub,
      role: decoded.role,
      id: usuarioId,
      tipo: tipo,
    });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("usuarioId");
    Cookies.remove("tipo");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
