import React, { useEffect, useState } from "react";
import { listarAlunos, deletarAluno } from "../../services/alunoService";
import { useNavigate } from "react-router-dom";

const Aluno = () => {
  const [alunos, setAlunos] = useState([]);
  const navigate = useNavigate();

  const carregarAlunos = async () => {
    try {
      const response = await listarAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
    }
  };

  const excluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este aluno?")) {
      try {
        await deletarAluno(id);
        carregarAlunos();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
      }
    }
  };

  const editar = (id) => {
    navigate(`/alunos/editar/${id}`);
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <button onClick={() => navigate("/alunos/cadastrar")}>Cadastrar Novo Aluno</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.periodo}</td>
              <td>
                <button onClick={() => editar(aluno.id)}>Editar</button>
                <button onClick={() => excluir(aluno.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Aluno;
