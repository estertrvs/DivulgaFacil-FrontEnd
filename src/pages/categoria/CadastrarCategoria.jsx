import { useNavigate, Link } from "react-router-dom"; // Navegação programática e links entre rotas
import { criarCategoria } from "../../services/categoriaService"; // Função que realiza a requisição POST para criar categoria
import { useState } from "react"; // Hook para manipular estado local do componente

function CadastrarCategoria() {
  const [nome, setNome] = useState(""); // Estado para armazenar o nome da nova categoria
  const navigate = useNavigate(); // Permite redirecionar o usuário após o cadastro

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página no submit

    const dados = { nome }; // Cria objeto com os dados que serão enviados para a API

    criarCategoria(dados)
      .then(() => {
        alert("Categoria cadastrada com sucesso!"); //C Confirmação visual
        navigate("/categorias"); // Redireciona para a lista de categorias após sucesso
      })
      .catch((err) => console.error("Erro ao cadastrar:", err)); // Exibe erro no console em caso de falha
  };

  // Retorna o JSX que renderiza o formulário de cadastro, o botão de envio e o link para voltar à listagem
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
