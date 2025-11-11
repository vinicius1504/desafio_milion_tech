import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MillionTec Customer Management API',
      version: '1.0.0',
      description: `
# API de Gerenciamento de Clientes MillionTec

API RESTful completa para gerenciar clientes com autenticação JWT.

## 🔐 Autenticação

Esta API usa **JWT (JSON Web Token)** para autenticação.

### Como autenticar:
1. Faça login no endpoint \`POST /api/auth/login\`
2. Copie o token retornado
3. Clique no botão **"Authorize"** no topo da página
4. Digite: \`Bearer {seu_token_aqui}\`
5. Clique em "Authorize"

### Credenciais padrão:
- **Username:** admin
- **Password:** admin123

## 📝 Recursos

- ✅ Autenticação JWT
- ✅ CRUD completo de clientes
- ✅ Paginação e busca
- ✅ Validação de dados
- ✅ Tratamento de erros

## 🚀 Base URL

**Desenvolvimento:** \`http://localhost:3001\`

## 📚 Status Codes

- **200** - OK: Requisição bem-sucedida
- **201** - Created: Recurso criado com sucesso
- **400** - Bad Request: Dados inválidos
- **401** - Unauthorized: Não autenticado ou token inválido
- **404** - Not Found: Recurso não encontrado
- **409** - Conflict: Email já cadastrado
- **500** - Internal Server Error: Erro no servidor
      `,
      contact: {
        name: 'MillionTec Support',
        email: 'support@milliontec.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://api.milliontec.com',
        description: 'Servidor de Produção',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticação (públicos)',
      },
      {
        name: 'Customers',
        description: 'Gerenciamento de clientes (requer autenticação)',
      },
      {
        name: 'Health',
        description: 'Health check e status da API',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer {token}',
        },
      },
      schemas: {
        Customer: {
          type: 'object',
          required: ['name', 'email', 'phone', 'address'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do cliente (gerado automaticamente)',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 255,
              description: 'Nome completo do cliente',
              example: 'João Silva Santos',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Email único do cliente',
              example: 'joao.silva@example.com',
            },
            phone: {
              type: 'string',
              maxLength: 20,
              description: 'Telefone do cliente (formato livre)',
              example: '(11) 98765-4321',
            },
            address: {
              type: 'string',
              minLength: 5,
              description: 'Endereço completo do cliente',
              example: 'Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro',
              example: '2024-01-15T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2024-01-20T15:45:00.000Z',
            },
          },
        },
        CustomerInput: {
          type: 'object',
          required: ['name', 'email', 'phone', 'address'],
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 255,
              description: 'Nome completo do cliente',
              example: 'João Silva Santos',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Email único do cliente',
              example: 'joao.silva@example.com',
            },
            phone: {
              type: 'string',
              maxLength: 20,
              description: 'Telefone do cliente',
              example: '(11) 98765-4321',
            },
            address: {
              type: 'string',
              minLength: 5,
              description: 'Endereço completo',
              example: 'Rua Exemplo, 123 - São Paulo, SP',
            },
          },
        },
        CustomerUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 3,
              maxLength: 255,
              description: 'Nome completo do cliente',
              example: 'João Silva Santos',
            },
            email: {
              type: 'string',
              format: 'email',
              maxLength: 255,
              description: 'Email único do cliente',
              example: 'joao.silva@example.com',
            },
            phone: {
              type: 'string',
              maxLength: 20,
              description: 'Telefone do cliente',
              example: '(11) 98765-4321',
            },
            address: {
              type: 'string',
              minLength: 5,
              description: 'Endereço completo',
              example: 'Rua Exemplo, 123 - São Paulo, SP',
            },
          },
        },
        PaginatedCustomers: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Customer',
                  },
                },
                total: {
                  type: 'number',
                  description: 'Total de clientes encontrados',
                  example: 50,
                },
                page: {
                  type: 'number',
                  description: 'Página atual',
                  example: 1,
                },
                totalPages: {
                  type: 'number',
                  description: 'Total de páginas',
                  example: 5,
                },
              },
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nome de usuário',
              example: 'admin',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
              example: 'admin123',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token JWT para autenticação',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                },
                user: {
                  type: 'object',
                  properties: {
                    username: {
                      type: 'string',
                      example: 'admin',
                    },
                  },
                },
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
            },
          },
        },
        MessageResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Erro ao processar requisição',
            },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Detalhes dos erros de validação',
              example: 'Email inválido; Nome deve ter no mínimo 3 caracteres',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Path to API docs
};

export const swaggerSpec = swaggerJsdoc(options);
