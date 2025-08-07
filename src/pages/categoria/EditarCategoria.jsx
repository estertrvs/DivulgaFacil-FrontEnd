import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { buscarCategoriaPorId, atualizarCategoria } from "../../services/categoriaService";
import "../../styles/Categoria.css";
import FormularioCadastro from "../../components/FormularioCadastro";

function EditarCategoria() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState({ nome: "" });

  useEffect(() => {
    buscarCategoriaPorId(id)
      .then((res) => setCategoria(res.data))
      .catch((err) => {
        console.error("Erro ao buscar categoria:", err);
        alert("Erro ao buscar dados da categoria.");
        navigate("/categorias");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarCategoria(id, categoria)
      .then(() => {
        alert("Categoria atualizada com sucesso!");
        navigate("/categorias");
      })
      .catch((err) => {
        console.error("Erro ao atualizar:", err);
        alert("Erro ao atualizar a categoria.");
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
    <FormularioCadastro
      titulo="Editar Categoria"
      campos={campos}
      onSubmit={handleSubmit}
      botaoTexto="Salvar Alterações"
      onVoltar={() => navigate("/categorias")}
    />
  );
}

export default EditarCategoria;
