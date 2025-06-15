import api from "./api";

export async function listarUsuarios() {
  return api.get("/usuarios");
}

export async function criarUsuario(usuario) {
  return api.post("/usuarios", usuario);
}
