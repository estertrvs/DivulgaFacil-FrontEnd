import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Oportunidades from "../pages/Oportunidade";
import Categorias from "../pages/Categoria";
import Usuarios from "../pages/Usuario";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
