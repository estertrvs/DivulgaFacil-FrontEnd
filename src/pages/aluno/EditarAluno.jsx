import React, { useEffect, useState } from "react";
import { buscarAlunoPorId, atualizarAluno } from "../../services/alunoService";
import { useNavigate, useParams } from "react-router-dom";

const EditarAluno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      console.error("Erro ao editar aluno:", error);
    }
  };

  return (
    <div>
      <h2>Editar Aluno</h2>
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

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarAluno;
