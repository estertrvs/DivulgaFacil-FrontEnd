import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>DivulgaFácil</h1>
      <p>Bem-vindo ao sistema de divulgação de oportunidades acadêmicas!</p>

      <nav>
        <ul>
          <li>
            <Link to="/oportunidades">Oportunidades</Link>
          </li>
          <li>
            <Link to="/categorias">Categorias</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
