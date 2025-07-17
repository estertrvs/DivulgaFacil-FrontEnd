import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div>
      <h1>DivulgaFácil</h1>
      <p>Bem-vindo ao sistema de divulgação de oportunidades acadêmicas!</p>

      <nav>
        <ul>
          <li><Link to="/oportunidades">Oportunidades</Link></li>
          <li><Link to="/categorias">Categorias</Link></li>
          <li><Link to="/usuarios">Usuários</Link></li>
          <li><Link to="/alunos">Alunos</Link></li> 
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        </ul>
      </nav>

      {isLoggedIn && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Home;
