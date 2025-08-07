import React, { useEffect, useState } from "react";
import { buscarAlunoPorId, atualizarAluno } from "../../services/alunoService";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Aluno.css";

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
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Editar Aluno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nome:</label>
          <input
            type="text"
            name="nome"
            value={aluno.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">E-mail:</label>
          <input
            type="email"
            name="email"
            value={aluno.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={aluno.matricula}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditarAluno;