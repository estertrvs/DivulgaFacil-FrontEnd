import api from "./api";

const login = async (identificador, senha) => {
  return api.post("/auth/login", { identificador, senha });
};

const provisionar = async (identificador, senha) => {
  return api.post("/auth/provisionar", { identificador, senha });
};

export default { login, provisionar };
