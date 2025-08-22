import React, { useEffect, useState } from "react";
import { buscarAlunoPorId, atualizarAluno } from "../../services/alunoService";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Aluno.css";
import FormularioCadastro from "../../components/FormularioCadastro";
import AlertModal from "../../components/AlertModal";
import { parseAxiosError } from "../../utils/parseAxiosError";

const EditarAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({ mostrar: false, titulo: "", mensagem: "" });
  const [aluno, setAluno] = useState({
    nome: "",
    email: "",
    matricula: "",
  });

  useEffect(() => {
    const carregarAluno = async () => {
      try {
        const response = await buscarAlunoPorId(id);
        setAluno(response.data);
      } catch (error) {
        console.error("Erro ao carregar aluno:", error);
      }
    };
    carregarAluno();
  }, [id]);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarAluno(id, aluno); 
      navigate("/alunos");
    } catch (error) {
      const errorData = parseAxiosError(error);
      console.error("Erro ao editar aluno:", error);
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
      label: "Nome",
      placeholder: "Digite o nome completo",
      value: aluno.nome,
      onChange: handleChange,
      required: true,
    },
    {
      name: "email",
      label: "E-mail",
      placeholder: "Digite o e-mail",
      type: "email",
      value: aluno.email,
      onChange: handleChange,
      required: true,
    },
    {
      name: "matricula",
      label: "Matrícula",
      placeholder: "Digite a matrícula",
      value: aluno.matricula,
      onChange: handleChange,
      required: true,
    },
  ];

  return (
    <>
      <FormularioCadastro
        titulo="Editar Aluno"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Salvar"
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

export default EditarAluno;