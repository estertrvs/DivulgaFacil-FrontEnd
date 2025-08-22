# 🎯 DivulgaFácil - Frontend

Frontend do sistema **DivulgaFácil**, desenvolvido em **React + Vite**.  
O projeto consome a API REST do backend para oferecer um sistema de **divulgação de oportunidades acadêmicas** (estágios, bolsas, cursos, concursos e eventos externos).

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router Dom](https://reactrouter.com/)
- Context API (para gerenciamento de autenticação)

---

## 🔧 Pré-requisitos

Para rodar o projeto, instale:

- **[Node.js](https://nodejs.org/)** (versão LTS recomendada)
- **npm** (vem com o Node) ou **yarn**

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

4. **Configure o backend no serviço da API:**

No arquivo `src/services/api.js`, ajuste a URL do backend se necessário:

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080", // backend rodando no Spring Boot
});
```

---

## ▶️ Rodando o projeto

Execute:

```bash
npm run dev
# ou
yarn dev
```

O Vite iniciará o servidor local:

```
VITE vX.X.X  ready in XXXX ms

➜  Local:   http://localhost:5173/
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Estrutura de Pastas

```
src
├── assets/        # Arquivos estáticos (ícones, imagens)
├── components/    # Componentes reutilizáveis
├── context/       # Context API (autenticação, usuário logado)
├── pages/         # Páginas principais da aplicação
├── routes/        # Definição de rotas e ProtectedRoute
├── services/      # Comunicação com o backend via Axios
├── styles/        # Estilização (CSS)
├── utils/         # Funções auxiliares
├── App.jsx        # Componente raiz
├── main.jsx       # Ponto de entrada
```

---

## 🌐 Rotas da Aplicação

- **Públicas:**
  - `/` → Página inicial
  - `/login` → Tela de login (autenticação local ou via SUAP)

- **Acesso de Aluno (`ROLE_ALUNO`):**
  - `/oportunidades` → Listagem de oportunidades
  - `/oportunidades/detalhes/:id` → Detalhes de uma oportunidade
  - `/categorias` → Listagem de categorias
  - `/favoritos` → Favoritos do aluno

- **Acesso de Administrador (`ROLE_ADM`):**
  - CRUD completo de Oportunidades
  - CRUD de Categorias
  - CRUD de Usuários (Alunos e Administradores)

---

## 🔐 Autenticação e Controle de Acesso

A aplicação integra com o backend para autenticação:

- O login pode ser feito:
  - Usando credenciais **locais** cadastradas no sistema.
  - Usando credenciais do **SUAP** (usuários provisionados a partir do sistema acadêmico).

- O token JWT retornado pelo backend é salvo no `localStorage` e usado em todas as requisições autenticadas.

- O componente `ProtectedRoute` garante que:
  - **Alunos (`ROLE_ALUNO`)** tenham acesso somente às rotas de listagem, detalhes e favoritos.
  - **Administradores (`ROLE_ADM`)** tenham acesso total (CRUD de oportunidades, categorias e usuários).

---

## 🚩 Funcionalidades Implementadas

- 🔑 Login com credenciais locais ou via SUAP
- 🔗 Controle de acesso por tipo de usuário (Aluno/ADM)
- 📑 Cadastro, listagem, edição e exclusão de oportunidades
- 🏷️ Gerenciamento de categorias
- 👥 Gerenciamento de usuários (alunos e administradores)
- ⭐ Favoritar oportunidades (funcionalidade para alunos)
- 🚦 Navegação protegida com `ProtectedRoute`

---

## 👥 Desenvolvedora

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
  </tr>
</table>

---

**Instituto Federal da Paraíba**  Disciplina de **Desenvolvimento de Aplicações Corporativas (DAC)**
