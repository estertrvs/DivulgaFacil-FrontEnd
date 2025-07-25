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

import Aluno from "../pages/aluno/Aluno";
import CadastrarAluno from "../pages/aluno/CadastrarAluno";
import EditarAluno from "../pages/aluno/EditarAluno";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/oportunidades/cadastrar" element={<CadastrarOportunidade />} />
        <Route path="/oportunidades/editar/:id" element={<EditarOportunidade />} />

        <Route path="/alunos" element={<Aluno />} />
        <Route path="/alunos/cadastrar" element={<CadastrarAluno />} />
        <Route path="/alunos/editar/:id" element={<EditarAluno />} />

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
