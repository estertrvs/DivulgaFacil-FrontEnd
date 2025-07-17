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
        alert("Oportunidade cadastrada com sucesso!");
        navigate("/oportunidades");
      })
      .catch((err) => console.error("Erro ao cadastrar:", err));
  };

  return (
    <div>
      <h1>Cadastrar Oportunidade</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Validade:</label>
          <input
            type="date"
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select
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
        <button type="submit">Cadastrar</button>
      </form>

      <br />
      <Link to="/oportunidades">← Voltar para Oportunidades</Link>
    </div>
  );
}

export default CadastrarOportunidade;
