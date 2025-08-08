import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Crie esse arquivo se ainda não existir

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const tipoUsuario = localStorage.getItem("tipo");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    navigate("/login");
  };

  return (
    <div className="container home-container">
      <h1 className="home-title">DivulgaFácil</h1>
      <p className="home-subtitle">Bem-vindo ao sistema de divulgação de oportunidades acadêmicas!</p>

      <div className="home-buttons">

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
      </div>

      {isLoggedIn && (
        <button className="btn-danger logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Home;
