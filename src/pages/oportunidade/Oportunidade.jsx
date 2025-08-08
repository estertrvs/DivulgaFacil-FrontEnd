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
import {
  favoritar,
  desfavoritar,
  listarFavoritosDoUsuario,
} from "../../services/favoritoService";


function Oportunidade() {
  const [oportunidades, setOportunidades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const usuarioId = localStorage.getItem("usuarioId"); 
  const tipoUsuario = localStorage.getItem("tipo"); 

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isLoggedIn) {
      carregarOportunidades();
      listarCategorias()
        .then((res) => setCategorias(res.data))
        .catch((err) => console.error("Erro ao carregar categorias:", err));
      if (tipoUsuario === "ALUNO") {
        listarFavoritosDoUsuario(usuarioId)
          .then((res) => setFavoritos(res.data.map((o) => o.id)))
          .catch((err) => console.error("Erro ao carregar favoritos:", err));
      }
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

  const favoritarOportunidade = (oportunidadeId) => {
    favoritar(usuarioId, oportunidadeId)
      .then(() => setFavoritos([...favoritos, oportunidadeId]))
      .catch((err) => console.error("Erro ao favoritar:", err));
  };

  const desfavoritarOportunidade = (oportunidadeId) => {
     desfavoritar(usuarioId, oportunidadeId)
    .then(() =>
      setFavoritos(favoritos.filter((id) => id !== oportunidadeId))
    )
    .catch((err) => console.error("Erro ao desfavoritar:", err));
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
              <td className="px-4 py-2 border">
                {o.dataValidade.split("-").reverse().join("/")}
              </td>
              <td className="px-4 py-2 border space-x-2">
                {tipoUsuario === "ADMIN" ? (
                  <>
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
                  </>
                ) : (
                  <button
                    className={`px-2 py-1 rounded transition ${
                      favoritos.includes(o.id)
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    onClick={() =>
                      favoritos.includes(o.id)
                        ? desfavoritarOportunidade(o.id)
                        : favoritarOportunidade(o.id)
                    }
                  >
                    {favoritos.includes(o.id) ? "Desfavoritar" : "Favoritar"}
                  </button>
                )}
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
