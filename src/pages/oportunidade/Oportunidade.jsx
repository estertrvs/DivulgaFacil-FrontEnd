import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarCategorias } from "../../services/categoriaService";
import {
  listarOportunidades,
  criarOportunidade,
  atualizarOportunidade,
  deletarOportunidade,
} from "../../services/oportunidadeService";

function Oportunidade() {
  const [oportunidades, setOportunidades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      carregarOportunidades();
      listarCategorias()
        .then((res) => setCategorias(res.data))
        .catch((err) => console.error("Erro ao carregar categorias:", err));
    }
  }, []);


  const carregarOportunidades = () => {
    listarOportunidades()
      .then((res) => setOportunidades(res.data))
      .catch((err) => console.error("Erro ao carregar:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      titulo,
      descricao,
      dataValidade,
      categoriaId,
    };

    const acao = editandoId
      ? atualizarOportunidade(editandoId, dados)
      : criarOportunidade(dados);

    acao
      .then(() => {
        setTitulo("");
        setDescricao("");
        setDataValidade("");
        setCategoriaId("");
        setEditandoId(null);
        carregarOportunidades();
      })
      .catch((err) => console.error("Erro ao salvar:", err));
  };

  const handleEditar = (id) => {
    navigate(`/oportunidades/editar/${id}`);
  };

  const handleDeletar = (id) => {
    const confirmacao = window.confirm("Deseja realmente excluir esta oportunidade?");
    if (!confirmacao) return;

    deletarOportunidade(id)
      .then(() => carregarOportunidades())
      .catch((err) => console.error("Erro ao excluir:", err));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Oportunidades</h1>
        <p>Você não está logado. <Link to="/login">Clique aqui para fazer login.</Link></p>
      </div>
    );
  }

  return (
    <div>
      <h1>Oportunidades</h1>
      <button onClick={() => navigate("/oportunidades/cadastrar")}>
        Cadastrar Oportunidade
      </button>
      <h2>Lista de Oportunidades</h2>
      <ul>
        {oportunidades.map((o) => (
          <li key={o.id}>
            <strong>{o.titulo}</strong>: {o.descricao} — Validade: {o.dataValidade}
            <br />
            <button onClick={() => handleEditar(o.id)}>Editar</button>
            <button onClick={() => handleDeletar(o.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Oportunidade;