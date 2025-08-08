import api from "./api";

export async function listarUsuarios() {
  return api.get("/usuarios");
}

export async function buscarUsuarioPorId(id) {
  return api.get(`/usuarios/${id}`);
}

export async function criarUsuario(usuario) {
  return api.post("/usuarios", usuario);
}

export async function atualizarUsuario(id, dados) {
  return api.put(`/usuarios/${id}`, dados);
}

export async function deletarUsuario(id) {
  api.delete(`/usuarios/${id}`);
}

