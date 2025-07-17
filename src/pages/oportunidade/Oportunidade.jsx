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

  const [idParaExcluir, setIdParaExcluir] = useState(null); 
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

    const dados = { titulo, descricao, dataValidade, categoriaId };

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

  const confirmarExclusao = () => {
    deletarOportunidade(idParaExcluir)
      .then(() => {
        carregarOportunidades();
        setIdParaExcluir(null); 
      })
      .catch((err) => console.error("Erro ao excluir:", err));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Oportunidades</h1>
        <p>
          Você não está logado.{" "}
          <Link to="/login">Clique aqui para fazer login.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Oportunidades</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/oportunidades/cadastrar")}
      >
        Cadastrar Oportunidade
      </button>

      <h2>Lista de Oportunidades</h2>
      <ul className="list-group">
        {oportunidades.map((o) => (
          <li key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{o.titulo}</strong>: {o.descricao} — Validade: {o.dataValidade}
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditar(o.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setIdParaExcluir(o.id)} 
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {idParaExcluir !== null && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIdParaExcluir(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Deseja realmente excluir esta oportunidade?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIdParaExcluir(null)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmarExclusao}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link to="/" className="btn btn-secondary ms-2">
        Voltar
      </Link>
    </div>
  );
}

export default Oportunidade;
