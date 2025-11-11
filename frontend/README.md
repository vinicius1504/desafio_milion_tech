# Frontend - Sistema de Clientes

Interface desenvolvida com React, TypeScript e Material UI.

## Tecnologias

- React 18 + TypeScript
- Material UI (componentes)
- React Router (rotas)
- React Hook Form + Yup (formulários/validação)
- Axios (requisições HTTP)
- jsPDF (geração de PDFs)
- Vite (build tool)

## Instalação

```bash
cd frontend
npm install
```

## Executar

```bash
npm run dev
```

Aplicação rodará em: http://localhost:3000

## Credenciais

- Usuário: `admin`
- Senha: `admin`

## Funcionalidades

### Autenticação
- Login com validação
- Proteção de rotas
- Redirecionamento automático
- Logout

### Gestão de Clientes
- Listar clientes (com busca em tempo real)
- Cadastrar novo cliente
- Editar cliente existente
- Excluir cliente (com confirmação)
- Exportar lista em PDF

## Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/       # PrivateRoute
│   │   ├── features/     # Login, Customers
│   │   └── layout/       # MainLayout
│   ├── contexts/         # AuthContext
│   ├── services/         # API services
│   ├── routes/           # Configuração de rotas
│   ├── types/            # TypeScript types
│   ├── utils/            # PDF generator
│   └── theme/            # Material UI theme
└── public/
```

## Scripts

```bash
npm run dev         # Desenvolvimento
npm run build       # Build de produção
npm run preview     # Preview do build
npm test           # Executar testes
```

## Validações de Formulário

- **Nome:** Mínimo 3 caracteres
- **E-mail:** Formato válido
- **Telefone:** Apenas números e caracteres especiais
- **Endereço:** Mínimo 5 caracteres

## Geração de PDF

O botão "Exportar PDF" cria um documento com:
- Lista completa de clientes
- Tabela formatada
- Data e hora da geração
- Paginação automática

## Integração com Backend

API Base: `http://localhost:3005/api`

Endpoints utilizados:
- `POST /auth/login` - Login
- `GET /auth/validate` - Validar token
- `GET /customers` - Listar
- `POST /customers` - Criar
- `PUT /customers/:id` - Atualizar
- `DELETE /customers/:id` - Excluir

## Proteção de Rotas

Rotas protegidas:
- `/` → Redireciona para `/customers`
- `/customers` → Lista de clientes

Rota pública:
- `/login` → Tela de login

Usuários não autenticados são redirecionados para `/login`.

## Configuração

Arquivo `.env`:
```
VITE_API_URL=http://localhost:3005/api
```
