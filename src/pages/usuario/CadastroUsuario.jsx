import { useState } from "react";
import { criarUsuario } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";
import FormularioCadastro from "../../components/FormularioCadastro";
import AlertModal from "../../components/AlertModal";
import { parseAxiosError } from "../../utils/parseAxiosError";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const [matricula, setMatricula] = useState("");
  const [siape, setSiape] = useState("");
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({ mostrar: false, titulo: "", mensagem: "" });

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
        const errorData = parseAxiosError(error);
        console.error("Erro ao cadastrar usuário:", error);
        if (errorData?.codigo === "USUARIO_JA_EXISTE") {
          setAlerta({
            mostrar: true,
            titulo: "Identificador duplicado",
            mensagem: errorData.mensagem,
          });
        }
      });
  };

  return (
    <>
      <FormularioCadastro
        campos={campos}
        onSubmit={handleSubmit}
        titulo="Cadastro de Usuário"
        botaoTexto="Cadastrar"
        onVoltar={() => navigate("/usuarios")}
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
}

export default CadastroUsuario;
