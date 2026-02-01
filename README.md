# 📖 Bibleasy Frontend

<p align="center">
  <img src="public/logo.png" alt="Bibleasy Logo" width="70" style="border-radius: 10px" />
</p>

<p align="center">
  <strong>
    🌐 <a href="https://bibleasy.com" target="_blank" rel="noopener noreferrer">Ver aplicação no ar</a> &nbsp;•&nbsp;
    🔧 <a href="https://github.com/viniciusrvcruz/bibleasy-backend" target="_blank" rel="noopener noreferrer">Repositório do Backend</a>
  </strong>
</p>

**Aplicação web moderna e responsiva para leitura da Bíblia**, desenvolvida com Nuxt 4 e Vue 3. Interface intuitiva para navegar entre livros, capítulos e versículos, com suporte a múltiplas versões bíblicas e temas claro/escuro.

<p align="center">
  <a href="https://nuxt.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Nuxt-4.2-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt" /></a>
  <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" /></a>
  <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/DaisyUI-5.x-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI" /></a>
  <a href="https://primevue.org/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/PrimeVue-4.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="PrimeVue" /></a>
  <a href="LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tech Stack](#-tech-stack)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar](#-como-executar)
- [Build para Produção](#-build-para-produção)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Como Contribuir](#-como-contribuir)
- [Contribuidores](#-contribuidores)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **Bibleasy Frontend** é o cliente web do projeto Bibleasy, que oferece uma experiência de leitura da Bíblia focada em simplicidade e personalização. O frontend consome a API do [bibleasy-backend](https://github.com/viniciusrvcruz/bibleasy-backend) para exibir livros, capítulos e versículos em múltiplas versões.

**Acesse em produção:** [https://bibleasy.com](https://bibleasy.com)

---

## ✨ Funcionalidades

| Recurso | Descrição |
| -------- | --------- |
| 📚 **Navegação intuitiva** | Explore livros, capítulos e versículos de forma simples |
| 🔄 **Múltiplas versões** | Suporte para diferentes versões da Bíblia |
| 🎨 **Temas variados** | Acesso a todos os temas do DaisyUI para personalização completa |
| 📱 **Design responsivo** | Interface otimizada para desktop, tablet e mobile |
| ⚡ **Performance** | Carregamento rápido com SSR (Server-Side Rendering) |
| 🖌️ **UI moderna** | Interface clean com TailwindCSS, DaisyUI e componentes PrimeVue |
| 🔍 **Seletor de versículos** | Painel interativo para navegação rápida |
| 🔐 **Type-safe** | Validação de dados com Zod e TypeScript |

---

## 🛠️ Tech Stack

| Tecnologia | Descrição |
| --------- | --------- |
| [Nuxt 4](https://nuxt.com/) | Framework Vue.js full-stack |
| [Vue 3](https://vuejs.org/) | Framework JavaScript progressivo |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript com tipagem estática |
| [TailwindCSS 4](https://tailwindcss.com/) | Framework CSS utility-first |
| [DaisyUI](https://daisyui.com/) | Biblioteca de componentes para Tailwind |
| [PrimeVue](https://primevue.org/) | Biblioteca de componentes Vue |
| [Pinia](https://pinia.vuejs.org/) | Gerenciamento de estado para Vue |
| [Zod](https://zod.dev/) | Validação de schemas TypeScript-first |
| [Nuxt Icon](https://nuxt.com/modules/icon) | Sistema de ícones |
| [Docker](https://www.docker.com/) | Containerização da aplicação |

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 20 ou superior — recomenda-se a versão LTS)
- **npm**, **pnpm**, **yarn** ou **bun**
- **Docker** e **Docker Compose** (opcional, para execução com containers)

---

## 🚀 Como Executar

### Instalação local

```bash
# 1. Clone o repositório
git clone https://github.com/viniciusrvcruz/bibleasy-frontend.git
cd bibleasy-frontend

# 2. Instale as dependências
npm install
# ou: pnpm install | yarn install | bun install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com a URL da API (ex.: backend em execução local)

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou: pnpm dev | yarn dev | bun run dev
```

A aplicação estará disponível em **http://localhost:3000**.

> **Nota:** Para dados reais, é necessário ter o [bibleasy-backend](https://github.com/viniciusrvcruz/bibleasy-backend) em execução e configurar `NUXT_PUBLIC_API_BASE_URL` e `NUXT_API_BASE_URL` no `.env`.

### Executando com Docker

```bash
# 1. Suba o container
docker-compose up -d

# 2. Acesse o container
docker exec -it bible_frontend bash

# 3. Instale as dependências e inicie o servidor
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

---

## 📦 Build para Produção

```bash
# Criar build otimizado
npm run build

# Visualizar a build de produção localmente
npm run preview
```

---

## 📁 Estrutura do Projeto

```
bibleasy-frontend/
├── app/
│   ├── assets/                 # Arquivos estáticos (CSS, imagens)
│   ├── components/              # Componentes Vue reutilizáveis
│   │   ├── bible/               # Componentes específicos da Bíblia
│   │   │   ├── chapter/         # Capítulo, versos, cabeçalho, modais
│   │   │   ├── verse_selector/  # Seletor de versículos
│   │   │   └── SearchModal.vue
│   │   ├── help/                # Componentes da página de ajuda
│   │   ├── layout/              # Header, tema, usuário
│   │   ├── shared/              # Componentes compartilhados
│   │   └── Icon.vue
│   ├── composables/             # Composables Vue (lógica reutilizável)
│   │   ├── bible/               # useBibleReference, useChapterHistory, etc.
│   │   ├── services/            # Serviços de API (book, chapter, version)
│   │   ├── useApi.ts
│   │   └── useNavigateToBible.ts
│   ├── layouts/
│   ├── pages/                   # Rotas (bible, help, index)
│   ├── stores/                  # Pinia (lastChapter, version)
│   ├── types/                   # Tipos TypeScript e schemas Zod
│   └── utils/                   # Funções utilitárias
├── public/
├── server/api/                  # API routes (ex.: sitemap)
├── docker-compose.yml
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Variáveis de Ambiente

| Variável | Descrição |
| -------- | --------- |
| `NUXT_PUBLIC_API_BASE_URL` | URL pública da API backend (browser) |
| `NUXT_API_BASE_URL` | URL da API backend (server-side) |

Exemplo (`.env`):

```env
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NUXT_API_BASE_URL=http://localhost:8000/api
```

---

## 🤝 Como Contribuir

Contribuições são bem-vindas.

### Passos rápidos

1. **Fork** o projeto e **clone** seu fork
2. Crie uma **branch** (`git checkout -b feature/minha-feature` ou `fix/correcao`)
3. Faça suas alterações (código limpo, comentários em **inglês**)
4. **Commit** com Conventional Commits em inglês (`feat: add X`, `fix: resolve Y`)
5. **Push** para a branch e abra um **Pull Request**

### Convenção de commits

| Tipo | Uso |
| ---- | --- |
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `style` | Formatação (sem mudança de lógica) |
| `refactor` | Refatoração |
| `chore` | Tarefas de manutenção |

### Diretrizes

- **Code style:** Vue 3 Composition API com `<script setup>`, TypeScript, TailwindCSS/DaisyUI
- **Validação:** Zod para dados da API
- **Idioma:** Branches, commits e comentários no código em **inglês**

### Reportar bugs ou sugerir melhorias

- **Bugs:** Abra uma [issue](https://github.com/viniciusrvcruz/bibleasy-frontend/issues) com descrição, passos para reproduzir e ambiente
- **Sugestões:** Abra uma issue com a tag `enhancement`

---

## 🤝 Contribuidores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/viniciusrvcruz" target="_blank" rel="noopener noreferrer">
        <img src="https://github.com/viniciusrvcruz.png" width="80px;" alt="Vinicius Cruz"/><br>
        <sub><b>Vinicius Cruz (autor)</b></sub>
      </a><br>
      <a href="https://github.com/viniciusrvcruz" title="GitHub" target="_blank" rel="noopener noreferrer">
        <img src="https://skillicons.dev/icons?i=github" width="25px" />
      </a>
      <a href="https://www.linkedin.com/in/viniciuscruz7" title="LinkedIn" target="_blank" rel="noopener noreferrer">
        <img src="https://skillicons.dev/icons?i=linkedin" width="25px" />
      </a>
    </td>
  </tr>
</table>

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p><strong>Desenvolvido com ❤️ por Vinicius Cruz</strong></p>
  <p>⭐ Deixe uma estrela se este projeto te ajudou!</p>
  <p>
    <a href="https://bibleasy.com" target="_blank" rel="noopener noreferrer">🌐 Bibleasy no ar</a> •
    <a href="https://github.com/viniciusrvcruz/bibleasy-backend" target="_blank" rel="noopener noreferrer">🔧 Backend (bibleasy-backend)</a>
  </p>
</div>
