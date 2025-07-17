import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Oportunidades from "../pages/Oportunidade";
import Categorias from "../pages/categoria/Categoria";
import EditarCategoria from "../pages/categoria/EditarCategoria";
import Usuarios from "../pages/Usuario";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
