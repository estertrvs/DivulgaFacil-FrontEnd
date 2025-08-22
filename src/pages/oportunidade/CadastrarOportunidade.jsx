import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarCategorias } from "../../services/categoriaService";
import { criarOportunidade } from "../../services/oportunidadeService";
import FormularioCadastro from "../../components/FormularioCadastro";

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

  const campos = [
    {
      name: "titulo",
      label: "Título",
      placeholder: "Digite o título",
      value: titulo,
      onChange: (e) => setTitulo(e.target.value),
      required: true,
    },
    {
      name: "descricao",
      label: "Descrição",
      placeholder: "Digite a descrição",
      value: descricao,
      onChange: (e) => setDescricao(e.target.value),
      required: true,
    },
    {
      name: "dataValidade",
      type: "date",
      label: "Data de validade",
      value: dataValidade,
      onChange: (e) => setDataValidade(e.target.value),
      required: true,
    },
    {
      name: "categoriaId",
      type: "select",
      label: "Categoria",
      value: categoriaId,
      onChange: (e) => setCategoriaId(parseInt(e.target.value)),
      required: true,
      options: categorias.map((c) => ({ value: c.id, label: c.nome })),
      placeholder: "Selecione uma categoria",
    },
  ];

  return (
    <div className="div-invisivel">
      {mensagem && (
        <div className="alert alert-info" role="alert">
          {mensagem}
        </div>
      )}

      <FormularioCadastro
        titulo="Cadastrar Oportunidade"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Cadastrar"
        onVoltar={() => navigate("/oportunidades")}
      />
    </div>
  );
}

export default CadastrarOportunidade;
