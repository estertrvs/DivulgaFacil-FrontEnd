import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarOportunidadePorId, atualizarOportunidade } from "../../services/oportunidadeService";
import { listarCategorias } from "../../services/categoriaService";
import "../../styles/Oportunidade.css";
import FormularioCadastro from "../../components/FormularioCadastro";

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

  const campos = [
    {
      name: "titulo",
      label: "Título",
      placeholder: "Digite o título da oportunidade",
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
      label: "Data de validade",
      type: "date",
      value: dataValidade,
      onChange: (e) => setDataValidade(e.target.value),
      required: true,
    },
    {
      name: "categoriaId",
      label: "Categoria",
      type: "select",
      value: categoriaId,
      onChange: (e) => setCategoriaId(parseInt(e.target.value)),
      required: true,
      options: categorias.map((c) => ({ value: c.id, label: c.nome })),
      placeholder: "Selecione uma categoria",
    },
  ];

  return (
    <div className="container">
      <h2>Editar Oportunidade</h2>

      {mensagem && (
        <div className={`alert alert-${tipoMensagem}`} role="alert">
          {mensagem}
        </div>
      )}

      <FormularioCadastro
        titulo="Editar Oportunidade"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Salvar Alterações"
        onVoltar={() => navigate("/oportunidades")}
      />
    </div>
  );
}

export default EditarOportunidade;
