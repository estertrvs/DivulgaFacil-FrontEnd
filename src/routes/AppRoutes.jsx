import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Oportunidades from "../pages/Oportunidade";
import Categorias from "../pages/Categoria";
import Usuarios from "../pages/Usuario";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
