import React, { useEffect, useState } from "react";
import { listarAlunos, deletarAluno } from "../../services/alunoService";
import { useNavigate } from "react-router-dom";
import ConfirmacaoModal from "../../components/ConfirmacaoModal";

const Aluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const navigate = useNavigate();

  const carregarAlunos = async () => {
    try {
      const response = await listarAlunos();
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
    }
  };

  const confirmarExclusao = async () => {
    try {
      await deletarAluno(idParaExcluir);
      carregarAlunos();
      setIdParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  const editar = (id) => {
    navigate(`/alunos/editar/${id}`);
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Lista de Alunos</h2>
      <button
        onClick={() => navigate("/alunos/cadastrar")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Cadastrar Novo Aluno
      </button>
      <table className="min-w-full border rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{aluno.id}</td>
              <td className="px-4 py-2 border">{aluno.nome}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => editar(aluno.id)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => setIdParaExcluir(aluno.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      { idParaExcluir !== null && (
        <ConfirmacaoModal
          titulo="Confirmar Exclusão"
          mensagem="Deseja realmente excluir este aluno?"
          onCancelar={() => setIdParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
    </div>
  );

};

export default Aluno;