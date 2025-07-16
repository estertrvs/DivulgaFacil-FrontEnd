import api from "./api";

export const listarOportunidades = () => api.get("/oportunidades");

export const criarOportunidade = (dados) =>
  api.post("/oportunidades", dados);

export const atualizarOportunidade = (id, dados) =>
  api.put(`/oportunidades/${id}`, dados);

export const buscarOportunidadePorId = (id) =>
  api.get(`/oportunidades/${id}`);

export const deletarOportunidade = (id) =>
  api.delete(`/oportunidades/${id}`);
