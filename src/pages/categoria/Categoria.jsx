import { useEffect, useState } from "react"; // Hooks para estado e efeitos colaterais
import { Link, useNavigate } from "react-router-dom"; // Navegação entre páginas
import {
  listarCategorias,
  criarCategoria,
  deletarCategoria,
} from "../../services/categoriaService"; // Funções de acesso à API

function Categoria() {
  const [categorias, setCategorias] = useState([]); // Lista de categorias exibidas
  const [nome, setNome] = useState(""); // Nome do formulário de cadastro
  const [idParaExcluir, setIdParaExcluir] = useState(null); // ID da categoria a ser excluída
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null; // Verifica se o usuário está logado

  useEffect(() => {
    if (isLoggedIn) {
      carregarCategorias(); // Carrega categorias ao montar o componente
    }
  }, []);

  const carregarCategorias = () => {
    listarCategorias()
      .then((res) => setCategorias(res.data)) // Atualiza a lista com dados da API
      .catch((err) => console.error("Erro ao carregar:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    criarCategoria({ nome }) // CREATE: envia nova categoria para API
      .then(() => {
        setNome(""); // Limpa o campo após o envio
        carregarCategorias(); // Recarrega a lista
      })
      .catch((error) => console.error("Erro ao criar categoria:", error));
  };

  const handleEditar = (id) => {
    navigate(`/categorias/editar/${id}`); // Redireciona para página de edição
  };

  const confirmarExclusao = () => {
    deletarCategoria(idParaExcluir) // DELETE: remove a categoria
      .then(() => {
        carregarCategorias(); // Atualiza lista
        setIdParaExcluir(null); // Fecha o modal
      })
      .catch((err) => console.error("Erro ao excluir categoria:", err));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Categorias</h1>
        <p>Você não está logado. <Link to="/login">Clique aqui para fazer login.</Link></p>
      </div>
    );
  }

  //retorno JSX, responsável pela interface de cadastro, listagem e exclusão de categorias.
  return (
    <div className="container mt-4">
      <h1>Categorias</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Categoria</button>
      </form>

      <h2>Lista de Categorias</h2>
      <ul className="list-group">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{categoria.nome}</span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEditar(categoria.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setIdParaExcluir(categoria.id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {}
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
                <p>Deseja realmente excluir esta categoria?</p>
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

      <Link to="/" className="btn btn-secondary mt-3">Voltar</Link>
    </div>
  );
}

export default Categoria;
