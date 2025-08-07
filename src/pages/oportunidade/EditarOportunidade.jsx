import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarOportunidadePorId, atualizarOportunidade } from "../../services/oportunidadeService";
import { listarCategorias } from "../../services/categoriaService";
import "../../styles/Oportunidade.css";

function EditarOportunidade() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    listarCategorias()
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.error("Erro ao listar categorias:", err);
        setMensagem("Erro ao carregar categorias.");
        setTipoMensagem("danger");
      });

    buscarOportunidadePorId(id)
      .then((res) => {
        const o = res.data;
        setTitulo(o.titulo);
        setDescricao(o.descricao);
        setDataValidade(o.dataValidade);
        setCategoriaId(o.categoriaId || "");
      })
      .catch((err) => {
        console.error("Erro ao buscar oportunidade:", err);
        setMensagem("Erro ao buscar dados da oportunidade.");
        setTipoMensagem("danger");
        setTimeout(() => navigate("/oportunidades"), 3000);
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
        setMensagem("Oportunidade atualizada com sucesso!");
        setTipoMensagem("success");
        setTimeout(() => navigate("/oportunidades"), 2000);
      })
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        setMensagem("Erro ao atualizar a oportunidade.");
        setTipoMensagem("danger");
      });
  };

  return (
    <div className="container">
      <h2>Editar Oportunidade</h2>

      {mensagem && (
        <div className={`alert alert-${tipoMensagem}`} role="alert">
          {mensagem}
        </div>
      )}

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
          >
            <option value="">Selecione...</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">Salvar Alterações</button>
          <Link to="/oportunidades" className="button-link ms-2">Voltar</Link>
        </div>
      </form>
    </div>
  );
}

export default EditarOportunidade;
