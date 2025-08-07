import { useNavigate, Link } from "react-router-dom"; 
import { criarCategoria } from "../../services/categoriaService";
import { useState } from "react";
import "../../styles/Categoria.css";  
import FormularioCadastro from "../../components/FormularioCadastro";

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

  const campos = [
    {
      name: "nome",
      label: "Nome da Categoria",
      placeholder: "Digite o nome da categoria",
      value: nome,
      onChange: (e) => setNome(e.target.value),
      required: true
    }
  ];

  return (
    <FormularioCadastro
      titulo="Cadastrar Categoria"
      campos={campos}
      onSubmit={handleSubmit}
      botaoTexto="Cadastrar"
      onVoltar={() => navigate("/categorias")}
    />
  );
}

export default CadastrarCategoria;
