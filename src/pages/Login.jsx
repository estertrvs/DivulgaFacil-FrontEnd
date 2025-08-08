import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "../styles/Login.css";

function Login() {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/auth/login", { identificador, senha })
      .then((response) => {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        const usuarioId = decoded.id;
        const tipoUsuario = response.data.tipo;
      
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        login(token, usuarioId, tipoUsuario);
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro no login:", error);
        alert("Falha no login. Verifique seus dados.");
      });
  };

  return (
    <div className="formulario-container">
      <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">Login</h2>

      <form onSubmit={handleSubmit}>
        <label className="formulario-label">Matrícula</label>
        <input
          type="text"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          required
        />

        <label className="formulario-label">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" className="botao-criar">Entrar</button>
      </form>

      <p className="mt-4 text-center">
        Ainda não tem uma conta?{" "}
        <Link to="/alunos/cadastrar" className="text-green-700 font-semibold hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}

export default Login;
