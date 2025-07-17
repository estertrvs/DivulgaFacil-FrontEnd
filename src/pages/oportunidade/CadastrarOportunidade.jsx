import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { listarCategorias } from "../../services/categoriaService";
import { criarOportunidade } from "../../services/oportunidadeService";

function CadastrarOportunidade() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [mensagem, setMensagem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    listarCategorias()
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao carregar categorias:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      titulo,
      descricao,
      dataValidade,
      categoriaId,
    };

    criarOportunidade(dados)
      .then(() => {
        setMensagem("Oportunidade cadastrada com sucesso!");
        setTimeout(() => {
          navigate("/oportunidades");
        }, 2000);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);
        setMensagem("Erro ao cadastrar oportunidade.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cadastrar Oportunidade</h2>

      {mensagem && (
        <div className="alert alert-info" role="alert">
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data de Validade:</label>
          <input
            type="date"
            className="form-control"
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Categoria:</label>
          <select
            className="form-select"
            value={categoriaId}
            onChange={(e) => setCategoriaId(parseInt(e.target.value))}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
        <Link to="/oportunidades" className="btn btn-secondary ms-2">
          Voltar
        </Link>
      </form>
    </div>
  );
}

export default CadastrarOportunidade;
