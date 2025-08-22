import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { filtrarOportunidades } from "../../services/oportunidadeService";
import "../../styles/Oportunidade.css";

function DetalhesOportunidade() {
  const { id } = useParams();
  const [oportunidade, setOportunidade] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    filtrarOportunidades({ id })
      .then((res) => {
        const dados = res.data[0];
        setOportunidade(dados);
      })
      .catch((err) => console.error("Erro ao carregar detalhes:", err));
  }, [id]);

  if (!oportunidade) {
    return <p>Carregando detalhes...</p>;
  }

  return (
    <div className="container-detalhes">
      <h2>Detalhes da Oportunidade</h2>
      <div className="detalhes-box">
        <p><strong>ID:</strong> {oportunidade.id}</p>
        <p><strong>Título:</strong> {oportunidade.titulo}</p>
        <p><strong>Descrição:</strong> {oportunidade.descricao}</p>
        <p><strong>Categoria:</strong> {oportunidade.categoriaId}</p>
        <p><strong>Data de Publicação:</strong> {new Date(oportunidade.dataPublicacao).toLocaleDateString('pt-BR')}</p>
        <p><strong>Data de Validade:</strong> {new Date(oportunidade.dataValidade).toLocaleDateString('pt-BR')}</p>
      </div>
      <div className="div-invisivel">
        <button className="botao-voltar" onClick={() => navigate("/oportunidades")}>Voltar</button>
      </div>
    </div>
  );
}

export default DetalhesOportunidade;
