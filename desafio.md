# Desafio Técnico - Desenvolvedor React

## Objetivo

Criar uma aplicação full-stack para **cadastro e listagem de clientes**, com autenticação simples, utilizando as tecnologias descritas abaixo.

---

## 🎯 Requisitos

### 1. Frontend (React)

- Utilizar **React** com **TypeScript**
- Utilizar **Material UI** para os componentes visuais
- Seguir **padrões de projeto** (componentização, organização de pastas, etc.)
- Utilizar **React Router** para gerenciamento de rotas
- Tela de **Login** simples
  - Usuário fixo: `admin`
  - Senha fixa: `admin`
- Tela de **Cadastro de Cliente**
  - Campos: Nome, E-mail, Telefone, Endereço
  - Permitir cadastrar e editar clientes
- Tela de **Listagem de Clientes**
  - Exibir os dados cadastrados
  - Permitir editar um cliente
  - Botão para **gerar um PDF** com a lista de clientes

### 2. Backend (Node.js + PostgreSQL)

- Criar uma API em **Node.js** com **TypeScript**
- TypeORM
- Utilizar **PostgreSQL** como banco de dados
- Endpoints:
  - Login (com verificação simples de usuário/senha)
  - CRUD de clientes (Create, Read, Update)
- Aplicar boas práticas de organização de código e separação de responsabilidades (ex: controllers, services, routes, etc.)

---

## 🔐 Autenticação

- Não é necessário implementar cadastro de usuários
- A autenticação deve ser **simples**, com usuário e senha fixos (`admin` / `admin`)
- O token pode ser um JWT ou uma implementação simples em memória/localStorage
- Após o login, as demais rotas devem ser protegidas

---

## 🧪 O que será avaliado

- Uso correto do **TypeScript**
- Conhecimento e uso de **Material UI**
- Boas práticas de **componentização** e organização de código
- Implementação de **rotas** e **proteção de rotas**
- Clareza, legibilidade e qualidade geral do código
- Conhecimento de backend com **Node.js + PostgreSQL**
- Integração entre frontend e backend
- Geração de **PDF da listagem de clientes**
- README com instruções de instalação e execução

---

## 🚀 Extra (diferenciais)

- Testes unitários ou de integração
- Deploy (ex: Vercel, Netlify, Railway, Render)
- Utilização de Docker

---

## 📝 Entrega

- Suba o projeto em um repositório **público no GitHub**
- Envie o link do repositório para avaliação

---

## 📦 Dicas

- Você pode usar bibliotecas para geração de PDF como [`jspdf`](https://github.com/parallax/jsPDF) ou [`react-pdf`](htt