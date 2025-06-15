import api from "./api";

export async function listarCategorias() {
  return api.get("/categorias");
}

export async function criarCategoria(categoria) {
  return api.post("/categorias", categoria);
}
