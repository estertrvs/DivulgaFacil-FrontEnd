import { useEffect, useState } from "react";
import { listarUsuarios, deletarUsuario } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";
import ConfirmacaoModal from "../../components/ConfirmacaoModal";
import "../../styles/Aluno.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const navigate = useNavigate();

  const carregarUsuarios = () => {
    listarUsuarios()
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const confirmarExclusao = async () => {
    try {
      await deletarUsuario(idParaExcluir);
      carregarUsuarios();
      setIdParaExcluir(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const editar = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  return (
    <div className="usuarios-container">
      <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">Usuários</h2>
      <div className="div-invisivel">
        <button className="botao-criar" onClick={() => navigate("/usuarios/cadastrar")}>
          Cadastrar Usuário
        </button>
      </div>
      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Identificador</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.tipo === "ALUNO" ? usuario.matricula : usuario.siape}</td>
              <td className="space-x-2">
                <button
                  onClick={() => editar(usuario.id)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => setIdParaExcluir(usuario.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="div-invisivel">
        <button type="button" className="botao-voltar" onClick={() => navigate("/")}>Voltar</button>
      </div>

      {idParaExcluir !== null && (
        <ConfirmacaoModal
          titulo="Confirmar Exclusão"
          mensagem="Deseja realmente excluir este usuário?"
          onCancelar={() => setIdParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
    </div>
  );
}

export default Usuarios;
