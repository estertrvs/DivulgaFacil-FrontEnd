import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { parseAxiosError } from "../utils/parseAxiosError";
import authService from "../services/authService";
import "../styles/Login.css";
import ConfirmacaoModal from "../components/ConfirmacaoModal";
import AlertModal from "../components/AlertModal";
import Cookies from "js-cookie";

function Login() {
  const [identificador, setIdentificador] = useState("");
  const [senha, setSenha] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [alerta, setAlerta] = useState({ mostrar: false, titulo: "", mensagem: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login(identificador, senha);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      const usuarioId = decoded.id;
      const tipoUsuario = response.data.tipo;

      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      login(token, usuarioId, tipoUsuario);
      navigate("/");
    } catch (error) {
      const errorData = parseAxiosError(error);
      console.error("Erro no login:", error);

      if (errorData?.codigo === "USUARIO_NAO_CADASTRADO") {
        setShowModal(true);
      } else if (errorData?.codigo === "USUARIO_INVALIDO") {
        setAlerta({
          mostrar: true,
          titulo: "Usuário inválido",
          mensagem: "Esse usuário não existe no SUAP. Peça para um administrador cadastrar você."
        });
      }
    }
  };

  const handleProvisionar = async () => {
    try {
      const response = await authService.provisionar(identificador, senha);
      const token = response.data.token;
      const decoded = jwtDecode(token);
      const usuarioId = decoded.id;
      const tipoUsuario = response.data.tipo;

      Cookies.set("token", token, { secure: true, sameSite: "Strict" });
      login(token, usuarioId, tipoUsuario);

      setAlerta({
        mostrar: true,
        titulo: "Cadastro realizado",
        mensagem: "Cadastro realizado com sucesso!"
      });

      setShowModal(false);
      navigate("/");
    } catch (error) {
      console.error("Erro ao provisionar usuário:", error);
      setAlerta({
        mostrar: true,
        titulo: "Erro ao cadastrar",
        mensagem: "Não foi possível cadastrar o usuário. Tente novamente."
      });
      setShowModal(false);
    }
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

      {showModal && (
        <ConfirmacaoModal
          titulo="Usuário não encontrado localmente."
          mensagem="Deseja se cadastrar com os dados do SUAP?"
          onConfirmar={handleProvisionar}
          onCancelar={() => setShowModal(false)}
        />
      )}

      {alerta.mostrar && (
        <AlertModal
          titulo={alerta.titulo}
          mensagem={alerta.mensagem}
          onFechar={() => setAlerta({ ...alerta, mostrar: false })}
        />
      )}

    </div>
  );
}

export default Login;
