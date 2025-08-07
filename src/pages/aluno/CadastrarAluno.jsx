import React, { useState } from "react";
import { cadastrarAluno } from "../../services/alunoService";
import { useNavigate } from "react-router-dom";
import FormularioCadastro from "../../components/FormularioCadastro";
import "../../styles/Aluno.css";

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

  const campos = [
    { 
      name: "nome", 
      label: "Nome Completo",
      placeholder: "Digite seu nome", 
      value: aluno.nome, 
      onChange: handleChange, 
      required: true 
    },
    { 
      name: "email", 
      type: "email", 
      label: "E-mail", 
      placeholder: "exemplo@email.com", 
      value: aluno.email, 
      onChange: handleChange, 
      required: true 
    },
    { 
      name: "matricula", 
      label: "Matrícula", 
      placeholder: "Digite a matrícula", 
      value: aluno.matricula, 
      onChange: handleChange, 
      required: true 
    },
    { 
      name: "senha", 
      type: "password", 
      label: "Senha", 
      placeholder: "Digite a senha", 
      value: aluno.senha, 
      onChange: handleChange, 
      required: true 
    }
  ];

  return (
     <FormularioCadastro
      titulo="Cadastrar Aluno"
      campos={campos}
      onSubmit={handleSubmit}
      botaoTexto="Cadastrar"
      onVoltar={() => navigate("/alunos")}
    />
  );
};

export default CadastrarAluno;