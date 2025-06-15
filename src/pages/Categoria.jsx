import { useEffect, useState } from "react";
import { listarCategorias, criarCategoria } from "../services/categoriaService";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");

  const carregarCategorias = () => {
    listarCategorias()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaCategoria = {
      nome: nome,
    };

    criarCategoria(novaCategoria)
      .then(() => {
        setNome("");
        carregarCategorias();
      })
      .catch((error) => {
        console.error("Erro ao criar categoria:", error);
      });
  };

  return (
    <div>
      <h1>Categorias</h1>

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

      <h2>Lista de Categorias</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>{categoria.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categorias;
