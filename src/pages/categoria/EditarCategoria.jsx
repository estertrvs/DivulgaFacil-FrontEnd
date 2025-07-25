import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarCategoriaPorId, atualizarCategoria } from "../../services/categoriaService";

function EditarCategoria() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarCategoriaPorId(id)
      .then((res) => {
        const categoria = res.data;
        setNome(categoria.nome);
      })
      .catch((err) => {
        console.error("Erro ao buscar categoria:", err);
        alert("Erro ao buscar dados da categoria.");
        navigate("/categorias");
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = { nome };

    atualizarCategoria(id, dados)
      .then(() => {
        alert("Categoria atualizada com sucesso!");
        navigate("/categorias");
      })
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        alert("Erro ao atualizar a categoria.");
      });
  };

  return (
    <div>
      <h1>Editar Categoria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID (não editável):</label>
          <input type="text" value={id} disabled />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>

      <br />
      <button
        type="button"
        onClick={() => navigate("/categorias")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Voltar para Categorias
      </button>

    </div> 
  );
}

export default EditarCategoria;
