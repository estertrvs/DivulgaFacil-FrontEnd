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
    <div className="categoria-container">
      <h2 className="categoria-titulo">Lista de Categorias</h2>

      <div className="categoria-actions">
        <button
          onClick={() => navigate("/categorias/cadastrar")}
          className="btn btn-success"
        >
          Cadastrar Nova Categoria
        </button>
      </div>

      <table className="categoria-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td className="categoria-acoes">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditar(categoria.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setIdParaExcluir(categoria.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="categoria-voltar">
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      {idParaExcluir !== null && (
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
