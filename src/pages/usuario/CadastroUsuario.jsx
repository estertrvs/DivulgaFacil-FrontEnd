import { useState } from "react";
import { criarUsuario } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";
import FormularioCadastro from "../../components/FormularioCadastro";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const [matricula, setMatricula] = useState("");
  const [siape, setSiape] = useState("");
  const navigate = useNavigate();

  const campos = [
    { name: "nome", label: "Nome", value: nome, onChange: (e) => setNome(e.target.value), required: true },
    { name: "email", label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true },
    { name: "senha", label: "Senha", type: "password", value: senha, onChange: (e) => setSenha(e.target.value), required: true },
    {
      name: "tipo",
      label: "Tipo",
      type: "select",
      value: tipo,
      onChange: (e) => setTipo(e.target.value),
      required: true,
      placeholder: "Selecione o tipo",
      options: [
        { value: "ALUNO", label: "Aluno" },
        { value: "ADMIN", label: "Administrador" },
      ],
    },
    ...(tipo === "ALUNO"
      ? [{ name: "matricula", label: "Matrícula", value: matricula, onChange: (e) => setMatricula(e.target.value), required: true }]
      : [{ name: "siape", label: "SIAPE", value: siape, onChange: (e) => setSiape(e.target.value), required: true }]),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome,
      email,
      senha,
      tipo,
      matricula: tipo === "ALUNO" ? matricula : null,
      siape: tipo === "ADMIN" ? siape : null,
    };

    criarUsuario(novoUsuario)
      .then(() => navigate("/usuarios"))
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
      });
  };

  return (
    <FormularioCadastro
      campos={campos}
      onSubmit={handleSubmit}
      titulo="Cadastro de Usuário"
      botaoTexto="Cadastrar"
      onVoltar={() => navigate("/usuarios")}
    />
  );
}

export default CadastroUsuario;
