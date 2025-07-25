import api from "./api";

export const listarCategorias = () => api.get("/categorias")

export const criarCategoria = (dados) =>
  api.post("/categorias", dados);

export const atualizarCategoria = (id, dados) =>
  api.put(`/categorias/${id}`, dados);

export const buscarCategoriaPorId = (id) =>
  api.get(`/categorias/${id}`);

export const deletarCategoria = (id) =>
  api.delete(`/categorias/${id}`);
