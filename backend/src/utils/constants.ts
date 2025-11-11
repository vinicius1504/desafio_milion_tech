export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
} as const;

export const MESSAGES = {
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  UNAUTHORIZED: 'Não autorizado',
  TOKEN_REQUIRED: 'Token de autenticação é obrigatório',
  TOKEN_INVALID: 'Token inválido ou expirado',
  CUSTOMER_NOT_FOUND: 'Cliente não encontrado',
  CUSTOMER_CREATED: 'Cliente criado com sucesso',
  CUSTOMER_UPDATED: 'Cliente atualizado com sucesso',
  CUSTOMER_DELETED: 'Cliente deletado com sucesso',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  INTERNAL_ERROR: 'Erro interno do servidor',
} as const;
