import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; 
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("token") !== undefined;
  const tipoUsuario = Cookies.get("tipo");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("tipo");
    Cookies.remove("usuarioId");
    window.location.replace("/login");
  };

  return (
    <div className="home-buttons">
      <h1 className="home-title">DivulgaFácil</h1>
      <p className="home-subtitle">Bem-vindo ao sistema de divulgação de oportunidades acadêmicas!</p>

      {isLoggedIn && tipoUsuario === "ALUNO" && (
        <button className="btn-primary" onClick={() => navigate("/oportunidades")}>
            Visualizar Oportunidades
          </button>
      )}

      {isLoggedIn && tipoUsuario !== "ALUNO" && (
        <>
          <button className="btn-primary" onClick={() => navigate("/oportunidades")}>
            Gerenciar Oportunidades
          </button>
          <button className="btn-primary" onClick={() => navigate("/categorias")}>
            Gerenciar Categorias
          </button>
          <button className="btn-primary" onClick={() => navigate("/usuarios")}>
            Gerenciar Usuários
          </button>
          <button className="btn-primary" onClick={() => navigate("/alunos")}>
            Genrenciar Alunos
          </button>
        </>
      )}
      {isLoggedIn && (
        <button className="btn-danger logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Home;
