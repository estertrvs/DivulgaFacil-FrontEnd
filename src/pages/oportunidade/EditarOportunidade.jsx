import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarOportunidadePorId, atualizarOportunidade } from "../../services/oportunidadeService";
import { listarCategorias } from "../../services/categoriaService";

function EditarOportunidade() {
  const { id } = useParams("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    buscarOportunidadePorId(id)
      .then((res) => {
        const o = res.data;
        setTitulo(o.titulo);
        setDescricao(o.descricao);
        setDataValidade(o.dataValidade);
        setCategoriaId(o.categoriaId); 
      })
      .catch((err) => {
        console.error("Erro ao buscar oportunidade:", err);
        alert("Erro ao buscar dados da oportunidade.");
        navigate("/oportunidades");
      });

    listarCategorias()
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.error("Erro ao listar categorias:", err);
      });
  }, [id, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      titulo,
      descricao,
      dataValidade,
      categoriaId,
    };

    atualizarOportunidade(id, dados)
      .then(() => {
        alert("Oportunidade atualizada com sucesso!");
        navigate("/oportunidades");
      })
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        alert("Erro ao atualizar a oportunidade.");
      });
  };

  return (
    <div>
      <h1>Editar Oportunidade</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID (não editável):</label>
          <input type="text" value={id} disabled />
        </div>
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
            title="Alterar categoria"
          >
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>

      <br />
      <Link to="/oportunidades">← Voltar para Oportunidades</Link>
    </div>
  );
}

export default EditarOportunidade;
