# Backend API - Sistema de Clientes

API RESTful desenvolvida com Node.js, TypeScript, Express e PostgreSQL.

## Tecnologias

- Node.js 18+ + TypeScript
- Express (framework web)
- TypeORM (ORM)
- PostgreSQL (banco de dados)
- JWT (autenticação)
- Jest + Supertest (testes)

## Instalação

```bash
cd backend
npm install
```

## Configuração

O arquivo `.env` já está configurado com:
- Porta: 3005
- Banco: PostgreSQL via Docker
- JWT Secret configurado

## Executar

### Com Docker (Recomendado)
```bash
# Na raiz do projeto
docker-compose up -d
```

### Sem Docker
```bash
npm run dev
```

API rodará em: http://localhost:3005

## Endpoints

### Autenticação

**Login**
```
POST /api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

**Validar Token**
```
GET /api/auth/validate
Headers: Authorization: Bearer {token}
```

### Clientes (requer autenticação)

**Listar todos**
```
GET /api/customers?page=1&limit=10&search=nome
```

**Buscar por ID**
```
GET /api/customers/:id
```

**Criar**
```
POST /api/customers
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 98765-4321",
  "address": "Rua das Flores, 123"
}
```

**Atualizar**
```
PUT /api/customers/:id
{
  "name": "João Santos"
}
```

**Deletar**
```
DELETE /api/customers/:id
```

## Estrutura

```
backend/
├── src/
│   ├── config/          # Configurações (DB, env, seed)
│   ├── controllers/     # Controladores das rotas
│   ├── entities/        # Entidades TypeORM
│   ├── middlewares/     # Middlewares (auth, error)
│   ├── repositories/    # Repositórios de dados
│   ├── routes/          # Definição de rotas
│   ├── services/        # Lógica de negócio
│   ├── types/           # Tipos TypeScript
│   └── server.ts        # Entry point
└── tests/              # Testes automatizados
```

## Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build
npm start           # Produção
npm test            # Testes
npm run seed        # Popular banco com 5 clientes
```

## Documentação Interativa

Swagger UI disponível em: http://localhost:3005/api-docs

## Segurança

- JWT para autenticação
- Helmet.js (headers seguros)
- CORS configurado
- Rate limiting
- Validação de dados (class-validator)
- Tratamento de erros

## Testes

```bash
npm test                 # Executar testes
npm run test:watch      # Watch mode
npm run test:coverage   # Com cobertura
```

## Dados Iniciais

Na primeira execução, o sistema cria automaticamente 5 clientes de exemplo.

Para resetar: `npm run seed`
