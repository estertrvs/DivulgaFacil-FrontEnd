import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/auth/login", { identificador, senha })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        navigate("/");
      })
      .catch((error) => {
        console.error("Erro no login:", error);
        alert("Falha no login. Verifique seus dados.");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Identificador:</label>
          <input
            type="text"
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
