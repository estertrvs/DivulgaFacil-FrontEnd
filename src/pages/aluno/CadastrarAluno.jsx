import React, { useState } from "react";
import { cadastrarAluno } from "../../services/alunoService";
import { useNavigate } from "react-router-dom";

const CadastrarAluno = () => {
  const navigate = useNavigate();
  const [aluno, setAluno] = useState({
    nome: "",
    email: "",
    matricula: "",
    senha: "",   
  });

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarAluno(aluno);
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  return (
    <div>
      <h2>Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={aluno.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={aluno.matricula}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={aluno.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarAluno;
