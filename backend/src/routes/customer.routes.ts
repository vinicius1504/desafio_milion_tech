import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const customerController = new CustomerController();

// All customer routes require authentication
router.use(authMiddleware);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Listar todos os clientes
 *     description: Retorna lista paginada de clientes com opção de busca
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Quantidade de itens por página
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Termo para busca em nome, email ou telefone
 *         example: João
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedCustomers'
 *             example:
 *               success: true
 *               data:
 *                 data:
 *                   - id: 123e4567-e89b-12d3-a456-426614174000
 *                     name: João Silva Santos
 *                     email: joao.silva@example.com
 *                     phone: (11) 98765-4321
 *                     address: Rua Exemplo, 123 - São Paulo, SP
 *                     createdAt: 2024-01-15T10:30:00.000Z
 *                     updatedAt: 2024-01-20T15:45:00.000Z
 *                   - id: 234e5678-e89b-12d3-a456-426614174001
 *                     name: Maria Santos
 *                     email: maria.santos@example.com
 *                     phone: (21) 99876-5432
 *                     address: Av. Principal, 456 - Rio de Janeiro, RJ
 *                     createdAt: 2024-01-16T11:00:00.000Z
 *                     updatedAt: 2024-01-16T11:00:00.000Z
 *                 total: 50
 *                 page: 1
 *                 totalPages: 5
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', customerController.getAll);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     description: Retorna os dados de um cliente específico
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do cliente
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               data:
 *                 id: 123e4567-e89b-12d3-a456-426614174000
 *                 name: João Silva Santos
 *                 email: joao.silva@example.com
 *                 phone: (11) 98765-4321
 *                 address: Rua Exemplo, 123 - São Paulo, SP
 *                 createdAt: 2024-01-15T10:30:00.000Z
 *                 updatedAt: 2024-01-20T15:45:00.000Z
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Customer with ID 123e4567-e89b-12d3-a456-426614174000 not found
 */
router.get('/:id', customerController.getById);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Criar novo cliente
 *     description: Cria um novo cliente no sistema
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerInput'
 *           examples:
 *             exemplo1:
 *               summary: Cliente completo
 *               value:
 *                 name: João Silva Santos
 *                 email: joao.silva@example.com
 *                 phone: (11) 98765-4321
 *                 address: Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567
 *             exemplo2:
 *               summary: Cliente simples
 *               value:
 *                 name: Maria Santos
 *                 email: maria.santos@example.com
 *                 phone: 21998765432
 *                 address: Av. Principal, 456 - Rio de Janeiro, RJ
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               data:
 *                 id: 123e4567-e89b-12d3-a456-426614174000
 *                 name: João Silva Santos
 *                 email: joao.silva@example.com
 *                 phone: (11) 98765-4321
 *                 address: Rua Exemplo, 123 - São Paulo, SP
 *                 createdAt: 2024-01-15T10:30:00.000Z
 *                 updatedAt: 2024-01-15T10:30:00.000Z
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               camposFaltando:
 *                 summary: Campos obrigatórios faltando
 *                 value:
 *                   success: false
 *                   message: All fields are required name, email, phone, address
 *               validacao:
 *                 summary: Erro de validação
 *                 value:
 *                   success: false
 *                   message: Invalid email format; Name must be at least 3 characters long
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Email already registered
 */
router.post('/', customerController.create);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     description: Atualiza os dados de um cliente existente (todos os campos são opcionais)
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do cliente
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerUpdate'
 *           examples:
 *             atualizarTudo:
 *               summary: Atualizar todos os campos
 *               value:
 *                 name: João Silva Santos Atualizado
 *                 email: joao.novo@example.com
 *                 phone: (11) 99999-9999
 *                 address: Rua Nova, 999 - São Paulo, SP
 *             atualizarParcial:
 *               summary: Atualizar apenas telefone e endereço
 *               value:
 *                 phone: (11) 99999-9999
 *                 address: Rua Nova, 999 - São Paulo, SP
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *             example:
 *               success: true
 *               data:
 *                 id: 123e4567-e89b-12d3-a456-426614174000
 *                 name: João Silva Santos Atualizado
 *                 email: joao.novo@example.com
 *                 phone: (11) 99999-9999
 *                 address: Rua Nova, 999 - São Paulo, SP
 *                 createdAt: 2024-01-15T10:30:00.000Z
 *                 updatedAt: 2024-01-20T15:45:00.000Z
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email já cadastrado para outro cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', customerController.update);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Deletar cliente
 *     description: Remove um cliente do sistema
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do cliente a ser deletado
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *             example:
 *               success: true
 *               message: Customer deleted successfully
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Customer with ID 123e4567-e89b-12d3-a456-426614174000 not found
 */
router.delete('/:id', customerController.delete);

export default router;
