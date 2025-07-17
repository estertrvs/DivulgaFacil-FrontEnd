import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  buscarCategoriaPorId,
  deletarCategoria
} from "../../services/categoriaService";

function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      carregarCategorias();
      listarCategorias()
        .then((res) => setCategorias(res.data))
        .catch((err) => console.error("Erro ao carregar categorias:", err));
    }
  }, []);

  const carregarCategorias = () => {
    listarCategorias()
      .then((res) => setOportunidades(res.data))
      .catch((err) => console.error("Erro ao carregar:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaCategoria = {
      nome: nome,
    };

    criarCategoria(novaCategoria)
      .then(() => {
        setNome("");
        carregarCategorias();
      })
      .catch((error) => {
        console.error("Erro ao criar categoria:", error);
      });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Categorias</h1>
        <p>Você não está logado. <Link to="/login">Clique aqui para fazer login.</Link></p>
      </div>
    );
  }

  return (
    <div>
      <h1>Categorias</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Categoria</button>
      </form>

      <h2>Lista de Categorias</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nome}</li>
        ))}
      </ul>
    </div>
  );
}

//taiwind
export default Categorias;
