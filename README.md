# Sistema de Gerenciamento de Clientes

Sistema full-stack para gerenciar clientes com autenticação JWT.

## Tecnologias

**Backend:**
- Node.js + TypeScript + Express
- PostgreSQL + TypeORM
- JWT para autenticação

**Frontend:**
- React + TypeScript
- Material UI
- React Router
- jsPDF (geração de PDF)

## Como Executar

### Pré-requisitos
- Docker Desktop instalado e rodando
- Node.js 18+

### 1. Iniciar Backend

```bash
docker-compose up -d
```

Aguarde 30 segundos para inicializar.

### 2. Iniciar Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Acessar

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3005
- **Swagger Docs:** http://localhost:3005/api-docs

### Credenciais

**Frontend:**
- Usuário: `admin`
- Senha: `admin`

**Backend API:**
- Usuário: `admin`
- Senha: `admin123`

## Funcionalidades

- Login com autenticação JWT
- Listar clientes (com busca)
- Cadastrar cliente
- Editar cliente
- Excluir cliente
- Exportar lista em PDF
- Rotas protegidas
- Validação de formulários

## Estrutura do Projeto

```
desafio_milion_tech/
├── backend/          # API Node.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── entities/
│   │   └── routes/
│   └── tests/
├── frontend/         # React App
│   └── src/
│       ├── components/
│       ├── services/
│       ├── contexts/
│       └── routes/
└── docker-compose.yml
```

## Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/validate` - Validar token

### Clientes (requer autenticação)
- `GET /api/customers` - Listar
- `GET /api/customers/:id` - Buscar por ID
- `POST /api/customers` - Criar
- `PUT /api/customers/:id` - Atualizar
- `DELETE /api/customers/:id` - Deletar

## Scripts Úteis

### Backend
```bash
cd backend
npm run dev          # Desenvolvimento
npm test            # Testes
npm run build       # Build
npm run seed        # Popular banco com 5 clientes
```

### Frontend
```bash
cd frontend
npm run dev         # Desenvolvimento
npm run build       # Build de produção
npm test           # Testes
```

## Dados Iniciais

O sistema cria automaticamente 5 clientes de exemplo na primeira vez que roda.

## Documentação Adicional

- `backend/README.md` - Documentação técnica do backend
- `frontend/README.md` - Documentação do frontend

## Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Docker

```bash
# Iniciar tudo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Resetar banco (limpa volumes)
docker-compose down -v
```

## Desenvolvido para o Desafio MillionTec
