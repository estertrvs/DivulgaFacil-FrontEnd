import React, { useState } from "react";
import { cadastrarAluno } from "../../services/alunoService";
import { useNavigate } from "react-router-dom";
import FormularioCadastro from "../../components/FormularioCadastro";
import "../../styles/Aluno.css";
import AlertModal from "../../components/AlertModal";
import { parseAxiosError } from "../../utils/parseAxiosError";

const CadastrarAluno = () => {
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({ mostrar: false, titulo: "", mensagem: "" });
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
      const errorData = parseAxiosError(error);
      console.error("Erro ao cadastrar aluno:", error);
      if (errorData?.codigo === "USUARIO_JA_EXISTE") {
        setAlerta({
          mostrar: true,
          titulo: "Matrícula duplicada",
          mensagem: errorData.mensagem,
        });
      }
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
    <>
      <FormularioCadastro
        titulo="Cadastrar Aluno"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Cadastrar"
        onVoltar={() => navigate("/alunos")}
      />
      {alerta.mostrar && (
        <AlertModal
          titulo={alerta.titulo}
          mensagem={alerta.mensagem}
          onFechar={() => setAlerta({ ...alerta, mostrar: false })}
        />
      )}
    </>
  );

};

export default CadastrarAluno;