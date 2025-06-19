import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarOportunidades, criarOportunidade } from "../services/oportunidadeService";

function Oportunidade() {
  const [oportunidades, setOportunidades] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      carregarOportunidades();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Função para buscar as oportunidades na API
  const carregarOportunidades = () => {
    listarOportunidades()
      .then((response) => {
        setOportunidades(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar oportunidades:", error);
      });
  };

  // Função para criar uma nova oportunidade
  const handleSubmit = (e) => {
    e.preventDefault();

    const novaOportunidade = {
      titulo: titulo,
      descricao: descricao,
      dataValidade: dataValidade,
      categoriaId: categoriaId, 
    };

    criarOportunidade(novaOportunidade)
      .then(() => {
        setTitulo("");
        setDescricao("");
        setDataValidade("");
        setCategoriaId("");
        carregarOportunidades(); // Atualiza a lista após criar
      })
      .catch((error) => {
        console.error("Erro ao criar oportunidade:", error);
      });
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Oportunidades</h1>
        <p>Você não está logado. <Link to="/login">Clique aqui para fazer login.</Link></p>
      </div>
    );
  }

  return (
    <div>
      <h1>Oportunidades</h1>

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
          <label>ID da categoria:</label>
          <input
            type="number"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Oportunidade</button>
      </form>

      <h2>Lista de Oportunidades</h2>
      <ul>
        {oportunidades.map((oportunidade) => (
          <li key={oportunidade.id}>
            <strong>{oportunidade.titulo}</strong>: {oportunidade.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Oportunidade;
