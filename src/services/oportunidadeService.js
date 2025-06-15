import api from "./api";

export async function listarOportunidades() {
  return api.get("/oportunidades");
}

export async function criarOportunidade(data) {
  return api.post("/oportunidades", data);
}

