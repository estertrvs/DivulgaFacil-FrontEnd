import api from "./api";

export const favoritar = (usuarioId, oportunidadeId) =>
  api.post("/favoritos", { usuarioId, oportunidadeId });

export const desfavoritar = (usuarioId, oportunidadeId) =>
  api.delete("/favoritos", { data: { usuarioId, oportunidadeId } });

export const listarFavoritosDoUsuario = (usuarioId) =>
  api.get(`/favoritos/usuario/${usuarioId}`);
