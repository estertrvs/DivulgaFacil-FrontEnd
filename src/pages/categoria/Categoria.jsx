import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Categoria.css";  
import ConfirmacaoModal from "../../components/ConfirmacaoModal";
import {
  listarCategorias,
  deletarCategoria,
} from "../../services/categoriaService";
import Cookies from "js-cookie";

function Categoria() {
  const [categorias, setCategorias] = useState([]);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("token") !== undefined;

  useEffect(() => {
    if (isLoggedIn) {
      carregarCategorias();
    }
  }, []);

  const carregarCategorias = () => {
    listarCategorias()
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao carregar:", err));
  };

  const handleEditar = (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  const confirmarExclusao = () => {
    deletarCategoria(idParaExcluir)
      .then(() => {
        carregarCategorias();
        setIdParaExcluir(null);
      })
      .catch((err) => console.error("Erro ao excluir categoria:", err));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Categorias</h1>
        <p>
          Você não está logado.{" "}
          <Link to="/login">Clique aqui para fazer login.</Link>
        </p>
      </div>
    );
  }
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Lista de Categorias</h2>
      <button
        onClick={() => navigate("/categorias/cadastrar")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Cadastrar Nova Categoria
      </button>
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{categoria.id}</td>
              <td className="px-4 py-2 border">{categoria.nome}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  onClick={() => handleEditar(categoria.id)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => setIdParaExcluir(categoria.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="btn btn-secondary mt-4">
        Voltar
      </Link>
      { idParaExcluir !== null && (
        <ConfirmacaoModal
          titulo="Confirmar Exclusão"
          mensagem="Deseja realmente excluir esta categoria?"
          onCancelar={() => setIdParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
    </div>
  );
}

export default Categoria;
