import { useNavigate, Link } from "react-router-dom";
import { criarCategoria } from "../../services/categoriaService";
import { useState } from "react";

function CadastrarCategoria() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = { nome };

    criarCategoria(dados)
      .then(() => {
        alert("Categoria cadastrada com sucesso!");
        navigate("/categorias");
      })
      .catch((err) => console.error("Erro ao cadastrar:", err));
  };

  return (
    <div>
      <h1>Cadastrar Categoria</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Categoria</button>
      </form>

      <br />
      <Link to="/categorias">← Voltar para Categorias</Link>
    </div>
  );
}

export default CadastrarCategoria;
