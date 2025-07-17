import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Oportunidades from "../pages/oportunidade/Oportunidade";
import CadastrarOportunidade from "../pages/oportunidade/CadastrarOportunidade";
import EditarOportunidade from "../pages/oportunidade/EditarOportunidade";
import Categorias from "../pages/categoria/Categoria";
import CadastrarCategoria from "../pages/categoria/CadastrarCategoria";
import EditarCategoria from "../pages/categoria/EditarCategoria";
import Usuarios from "../pages/Usuario";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/oportunidades/cadastrar" element={<CadastrarOportunidade />} />
        <Route path="/oportunidades/editar/:id" element={<EditarOportunidade />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/cadastrar" element={<CadastrarCategoria />} />
        <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
