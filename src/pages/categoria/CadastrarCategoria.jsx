import { useNavigate } from "react-router-dom"; 
import { criarCategoria } from "../../services/categoriaService";
import { useState } from "react";
import "../../styles/Categoria.css";  
import FormularioCadastro from "../../components/FormularioCadastro";

function CadastrarCategoria() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = { nome };

    criarCategoria(dados)
      .then(() => {
        setMensagem("Categoria cadastrada com sucesso!");
        setTimeout(() => navigate("/categorias"), 1500);
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
    <div>
      {mensagem && <div className="alert">{mensagem}</div>}
      <FormularioCadastro
        titulo="Cadastrar Categoria"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Cadastrar"
        onVoltar={() => navigate("/categorias")}
      />
    </div>
  );
}

export default CadastrarCategoria;
