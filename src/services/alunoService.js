import api from "./api";

export const listarAlunos = () => api.get("/alunos");

export const cadastrarAluno = (dados) => api.post("/alunos", dados);

export const atualizarAluno = (id, dados) => api.put(`/alunos/${id}`, dados);

export const buscarAlunoPorId = (id) => api.get(`/alunos/${id}`);

export const deletarAluno = (id) => api.delete(`/alunos/${id}`);
