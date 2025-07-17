import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";


import Oportunidades from "../pages/oportunidade/Oportunidade";
import CadastrarOportunidade from "../pages/oportunidade/CadastrarOportunidade";
import EditarOportunidade from "../pages/oportunidade/EditarOportunidade";


import Categorias from "../pages/Categoria";
import Usuarios from "../pages/Usuario";
import Login from "../pages/Login";


import Aluno from "../pages/aluno/aluno";
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
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
