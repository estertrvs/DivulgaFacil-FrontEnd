import React, { useEffect, useState } from "react";
import { buscarUsuarioPorId, atualizarUsuario } from "../../services/usuarioService";
import { useNavigate, useParams } from "react-router-dom";
import FormularioCadastro from "../../components/FormularioCadastro";
import AlertModal from "../../components/AlertModal";
import { parseAxiosError } from "../../utils/parseAxiosError";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    tipo: "",
    matricula: "",
    siape: "",
  });
  const [alerta, setAlerta] = useState({ mostrar: false, titulo: "", mensagem: "" });

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const response = await buscarUsuarioPorId(id);
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    carregarUsuario();
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarUsuario(id, usuario);
      navigate("/usuarios");
    } catch (error) {
      const errorData = parseAxiosError(error);
      console.error("Erro ao editar aluno:", error);
      if (errorData?.codigo === "USUARIO_JA_EXISTE") {
        setAlerta({
          mostrar: true,
          titulo: "Identificador duplicado",
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
      value: usuario.nome,
      onChange: handleChange,
      required: true,
    },
    {
      name: "email",
      label: "E-mail",
      placeholder: "Digite o e-mail",
      type: "email",
      value: usuario.email,
      onChange: handleChange,
      required: true,
    },
    ...(usuario.matricula
      ? [{
          name: "matricula",
          label: "Matrícula",
          placeholder: "Digite a matrícula",
          value: usuario.matricula,
          onChange: handleChange,
          required: true,
        }]
      : [{
          name: "siape",
          label: "SIAPE",
          placeholder: "Digite o SIAPE",
          value: usuario.siape,
          onChange: handleChange,
          required: true,
        }]
    ),
  ];

  return (
    <>
      <FormularioCadastro
        titulo="Editar Usuário"
        campos={campos}
        onSubmit={handleSubmit}
        botaoTexto="Salvar"
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
};

export default EditarUsuario;
