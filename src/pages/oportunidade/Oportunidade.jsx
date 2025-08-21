import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarCategorias } from "../../services/categoriaService";
import ConfirmacaoModal from "../../components/ConfirmacaoModal";
import "../../styles/Oportunidade.css";
import {
  filtrarOportunidades,
  criarOportunidade,
  atualizarOportunidade,
  deletarOportunidade,
} from "../../services/oportunidadeService";
import {
  favoritar,
  desfavoritar,
  listarFavoritosDoUsuario,
} from "../../services/favoritoService";
import Cookies from "js-cookie";


function Oportunidade() {
  const [oportunidades, setOportunidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [idParaExcluir, setIdParaExcluir] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const usuarioId = Cookies.get("usuarioId");
  const tipoUsuario = Cookies.get("tipo");
  const isLoggedIn = Cookies.get("token") !== undefined;
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroDataPublicacao, setFiltroDataPublicacao] = useState("");
  const [filtroDataValidade, setFiltroDataValidade] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      carregarOportunidades();
      listarCategorias()
        .then((res) => setCategorias(res.data))
        .catch((err) => console.error("Erro ao carregar categorias:", err));
      if (tipoUsuario === "ALUNO") {
        listarFavoritosDoUsuario(usuarioId)
          .then((res) => setFavoritos(res.data.map((o) => o.id)))
          .catch((err) => console.error("Erro ao carregar favoritos:", err));
      }
    }
  }, []);

  const carregarOportunidades = async () => {
    try {
      const filtros = {
        titulo: filtroTitulo || undefined,
        dataPublicacao: filtroDataPublicacao || undefined,
        dataValidade: filtroDataValidade || undefined,
        categoriaId: filtroCategoria || undefined,
      };

      const resOportunidades = await filtrarOportunidades(filtros);
      const resCategorias = await listarCategorias();

      const categoriasMap = resCategorias.data.reduce((map, cat) => {
        map[cat.id] = cat.nome;
        return map;
      }, {});

      const oportunidadesComCategoria = resOportunidades.data.map((o) => ({
        ...o,
        categoria: {
          id: o.categoriaId,
          nome: categoriasMap[o.categoriaId] || "Desconhecida",
        },
      }));

      setOportunidades(oportunidadesComCategoria);
    } catch (err) {
      console.error("Erro ao carregar dados filtrados:", err);
    }
  };

  const favoritarOportunidade = (oportunidadeId) => {
    favoritar(usuarioId, oportunidadeId)
      .then(() => setFavoritos([...favoritos, oportunidadeId]))
      .catch((err) => console.error("Erro ao favoritar:", err));
  };

  const desfavoritarOportunidade = (oportunidadeId) => {
     desfavoritar(usuarioId, oportunidadeId)
    .then(() =>
      setFavoritos(favoritos.filter((id) => id !== oportunidadeId))
    )
    .catch((err) => console.error("Erro ao desfavoritar:", err));
  };


  const handleEditar = (id) => {
    navigate(`/oportunidades/editar/${id}`);
  };

  const confirmarExclusao = () => {
    deletarOportunidade(idParaExcluir)
      .then(() => {
        carregarOportunidades();
        setIdParaExcluir(null);
      })
      .catch((err) => console.error("Erro ao excluir:", err));
  };

  if (!isLoggedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Oportunidades</h1>
        <p>
          Você não está logado.{" "}
          <Link to="/login" className="text-blue-600 underline">
            Clique aqui para fazer login.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="actions">
        {tipoUsuario === "ADM" && (
          <button
            onClick={() => navigate("/oportunidades/cadastrar")}
            className="btn-primary"
          >
            Cadastrar Oportunidade
          </button>
        )}
      </div>

      <h2>Lista de Oportunidades</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filtrar por publicação"
          value={filtroDataPublicacao}
          onChange={(e) => setFiltroDataPublicacao(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filtrar por validade"
          value={filtroDataValidade}
          onChange={(e) => setFiltroDataValidade(e.target.value)}
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
      </div>

      <button className="btn-primary" onClick={carregarOportunidades}>
        Buscar
      </button>

       <button
        className="btn-secondary"
        onClick={() => {
          setFiltroTitulo("");
          setFiltroDataPublicacao("");
          setFiltroDataValidade("");
          setFiltroCategoria("");
          carregarOportunidades();
        }}
      >
        Limpar
      </button>

      <table className="tabela-oportunidades">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Publicação</th>
            <th>Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {oportunidades.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.titulo}</td>
              <td>{o.descricao}</td>
              <td>{o.categoria?.nome || "Sem categoria"}</td>
              <td>
                {new Date(o.dataPublicacao)
                  .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </td>
              <td>
                {new Date(o.dataValidade)
                  .toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
              </td>
              <td>
                {tipoUsuario === "ADM" ? (
                  <>
                    <button className="btn-warning" onClick={() => handleEditar(o.id)}>Editar</button>
                    <button className="btn-danger" onClick={() => setIdParaExcluir(o.id)}>Excluir</button>
                  </>
                ) : (
                  <button
                    className={favoritos.includes(o.id) ? "btn-secondary" : "btn-primary"}
                    onClick={() =>
                      favoritos.includes(o.id)
                        ? desfavoritarOportunidade(o.id)
                        : favoritarOportunidade(o.id)
                    }
                  >
                    {favoritos.includes(o.id) ? "Desfavoritar" : "Favoritar"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="botao-voltar" onClick={() => navigate("/")}>Voltar</button>
  
      {idParaExcluir !== null && (
        <ConfirmacaoModal
          titulo="Confirmar Exclusão"
          mensagem="Deseja realmente excluir esta oportunidade?"
          onCancelar={() => setIdParaExcluir(null)}
          onConfirmar={confirmarExclusao}
        />
      )}
    </div>
  );

}

export default Oportunidade;
