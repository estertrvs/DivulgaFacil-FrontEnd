import { useEffect, useState } from "react";
import { listarUsuarios, criarUsuario } from "../services/usuarioService";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const [matricula, setMatricula] = useState("");
  const [siape, setSiape] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome: nome,
      email: email,
      senha: senha,
      tipo: tipo,
      matricula: tipo === "ALUNO" ? matricula : null,
      siape: tipo === "ADMIN" ? siape : null,
    };

    criarUsuario(novoUsuario)
      .then(() => {
        setNome("");
        setEmail("");
        setSenha("");
        setTipo("ALUNO");
        setMatricula("");
        setSiape("");
        carregarUsuarios();
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
      });
  };

  return (
    <div>
      <h1>Usuários</h1>

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
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="ALUNO">Aluno</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        {tipo === "ALUNO" && (
          <div>
            <label>Matrícula:</label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>
        )}

        {tipo === "ADMIN" && (
          <div>
            <label>SIAPE:</label>
            <input
              type="text"
              value={siape}
              onChange={(e) => setSiape(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Cadastrar Usuário</button>
      </form>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>{usuario.nome}</strong> - {usuario.email} -{" "}
            {usuario.tipo}{" "}
            {usuario.tipo === "ALUNO" ? `(Matrícula: ${usuario.matricula})` : `(SIAPE: ${usuario.siape})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
