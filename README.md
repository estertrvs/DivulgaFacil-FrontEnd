
# 🎯 DivulgaFácil - Frontend

Frontend do sistema **DivulgaFácil**, desenvolvido em **React + Vite**, com integração via **API REST** ao backend. O sistema permite o gerenciamento de oportunidades acadêmicas, categorias e usuários (alunos e administradores).

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router Dom](https://reactrouter.com/)

---

## 🔧 Pré-requisitos

Para rodar o projeto na sua máquina, você precisa ter instalado:

- **[Node.js](https://nodejs.org/)** (versão recomendada LTS)
- **npm** (já vem com o Node) ou **yarn** (opcional)

---

## ⚙️ Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/estertrvs/DivulgaFacil-FrontEnd.git
```

2. **Acesse a pasta do projeto:**

```bash
cd DivulgaFacil-FrontEnd
```

3. **Instale as dependências:**

```bash
npm install
# ou
yarn
```

4. **Configure o arquivo da API:**

No arquivo `src/services/api.js`, verifique se a URL base do backend está correta:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080", 
});
```

Ajuste a URL conforme a porta e endereço que seu backend está rodando.

---

## ▶️ Como rodar o projeto

Execute o comando:

```bash
npm run dev
# ou
yarn dev
```

O Vite irá subir um servidor local e você verá algo como:

```
VITE vX.X.X  ready in XXXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.X.XXX:5173/
```

Acesse pelo navegador: [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Estrutura de Pastas

```
src
├── components        # Componentes reutilizáveis (futuramente)
├── pages             # Páginas da aplicação
│   ├── Categoria.jsx
│   ├── Home.jsx
│   ├── Oportunidade.jsx
│   └── Usuario.jsx
├── services          # Arquivos responsáveis por requisições à API
│   ├── api.js
│   ├── categoriaService.js
│   ├── oportunidadeService.js
│   └── usuarioService.js
├── App.jsx           # Componente principal
├── AppRoutes.jsx     # Arquivo de rotas
├── index.css         # Estilo global
└── main.jsx          # Arquivo de inicialização
```

---

## 🌐 Rotas da Aplicação

- `/` → Página inicial
- `/oportunidades` → Gestão de Oportunidades
- `/categorias` → Gestão de Categorias
- `/usuarios` → Gestão de Usuários

---

## 🚩 Funcionalidades Implementadas

- 🔗 Integração completa com backend (GET e POST)
- 🧑‍💼 Cadastro de usuários (Aluno ou Administrador) com campos dinâmicos
- 📑 Cadastro e listagem de oportunidades
- 🏷️ Cadastro e listagem de categorias
- 🔗 Navegação entre páginas

## 👥 Contribuidores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/estertrvs" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/141650957?v=4" width="100px;" alt="Foto de Ester"/><br>
        <sub>
          <b>Ester Trevisan</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/analiciafsoares" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/144076062?v=4" width="100px;" alt="Foto de Ana"/><br>
        <sub>
          <b>Ana Licia Soares</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Joaopaulomedeirosdesouza" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/148402008?v=4" width="100px;" alt="Foto de João Paulo"/><br>
        <sub>
          <b>João Paulo Medeiros</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KesleyWilie" title="GitHub">
        <img src="https://avatars.githubusercontent.com/u/144160126?v=4" width="100px;" alt="Foto de Kesley"/><br>
        <sub>
          <b>Otávio Estendio</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

---

**Instituto Federal da Paraíba** - Disciplina de **Desenvolvimento de Aplicações Corporativas**.