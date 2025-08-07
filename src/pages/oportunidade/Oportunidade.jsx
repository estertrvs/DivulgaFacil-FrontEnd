import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarCategorias } from "../../services/categoriaService";
import ConfirmacaoModal from "../../components/ConfirmacaoModal";
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
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Oportunidades</h1>
        <p>
          Você não está logado.{" "}
          <Link to="/login" className="text-blue-600 underline">
            Clique aqui para fazer login.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Oportunidades</h1>

      <button
        onClick={() => navigate("/oportunidades/cadastrar")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Cadastrar Oportunidade
      </button>

      <h2 className="text-xl font-semibold mb-2">Lista de Oportunidades</h2>

      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Título</th>
            <th className="px-4 py-2 border">Descrição</th>
            <th className="px-4 py-2 border">Validade</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {oportunidades.map((o) => (
            <tr key={o.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{o.id}</td>
              <td className="px-4 py-2 border">{o.titulo}</td>
              <td className="px-4 py-2 border">{o.descricao}</td>
              <td className="px-4 py-2 border">{o.dataValidade}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  onClick={() => handleEditar(o.id)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => setIdParaExcluir(o.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      { idParaExcluir !== null && (
        <ConfirmacaoModal
          titulo="Confirmar Exclusão"
          mensagem="Deseja realmente excluir esta oportunidade?"
          onCancelar={() => setIdParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
      <Link
        to="/"
        className="mt-6 inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Voltar
      </Link>
    </div>
  );
}

export default Oportunidade;
