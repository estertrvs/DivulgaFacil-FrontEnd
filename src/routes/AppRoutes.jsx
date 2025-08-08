import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

import Oportunidades from "../pages/oportunidade/Oportunidade";
import CadastrarOportunidade from "../pages/oportunidade/CadastrarOportunidade";
import EditarOportunidade from "../pages/oportunidade/EditarOportunidade";

import Categorias from "../pages/categoria/Categoria";
import CadastrarCategoria from "../pages/categoria/CadastrarCategoria";
import EditarCategoria from "../pages/categoria/EditarCategoria";

import Usuarios from "../pages/usuario/Usuario";
import CadastroUsuario from "../pages/usuario/CadastroUsuario";
import EditarUsuario from "../pages/usuario/EditarUsuario";
import Login from "../pages/Login";

import Aluno from "../pages/aluno/Aluno";
import CadastrarAluno from "../pages/aluno/CadastrarAluno";
import EditarAluno from "../pages/aluno/EditarAluno";

import ProtectedRoute from "./ProtectedRoutes"; 

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/oportunidades"
          element={
            <ProtectedRoute tipoPermitido={["ROLE_ADM", "ROLE_ALUNO"]}>
              <Oportunidades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/oportunidades/cadastrar"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <CadastrarOportunidade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/oportunidades/editar/:id"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <EditarOportunidade />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alunos"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <Aluno />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alunos/cadastrar"
          element={
              <CadastrarAluno />
          }
        />
        <Route
          path="/alunos/editar/:id"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <EditarAluno />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias"
          element={
            <ProtectedRoute tipoPermitido={["ROLE_ADM", "ROLE_ALUNO"]}>
              <Categorias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias/cadastrar"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <CadastrarCategoria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias/editar/:id"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <EditarCategoria />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <Usuarios />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/cadastrar"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <CadastroUsuario />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios/editar/:id"
          element={
            <ProtectedRoute tipoPermitido="ROLE_ADM">
              <EditarUsuario />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
