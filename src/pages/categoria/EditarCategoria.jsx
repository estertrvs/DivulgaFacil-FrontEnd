import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarCategoriaPorId, atualizarCategoria } from "../../services/categoriaService";
import "../../styles/Categoria.css";
import FormularioCadastro from "../../components/FormularioCadastro";

function EditarCategoria() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState({ nome: "" });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarCategoriaPorId(id)
      .then((res) => setCategoria(res.data))
      .catch((err) => {
        console.error("Erro ao buscar categoria:", err);
        setMensagem("Erro ao buscar dados da categoria.");
        setTimeout(() => navigate("/categorias"), 1500);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarCategoria(id, categoria)
      .then(() => {
        setMensagem("Categoria atualizada com sucesso!");
        setTimeout(() => navigate("/categorias"), 1500);
      })
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        setMensagem("Erro ao atualizar a categoria.");
      });
  };

  const campos = [
    {
      name: "nome",
      label: "Nome da Categoria",
      placeholder: "Digite o nome da categoria",
      value: categoria.nome,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <div className="categoria-container">
      {mensagem && <div className={`alert ${mensagem.includes("❌") ? "alert-danger" : ""}`}>{mensagem}</div>}
      <FormularioCadastro
        titulo="Editar Categoria"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Salvar Alterações"
        onVoltar={() => navigate("/categorias")}
      />
    </div>
  );
}

export default EditarCategoria;