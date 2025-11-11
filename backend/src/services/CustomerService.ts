import { validate } from 'class-validator';
import { Customer } from '../entities/Customer';
import { CustomerRepository, PaginationParams, PaginatedResult } from '../repositories/CustomerRepository';
import { NotFoundError, ConflictError, ValidationError } from '../errors/AppError';

export interface CreateCustomerDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export class CustomerService {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async getAllCustomers(params: PaginationParams): Promise<PaginatedResult<Customer>> {
    return this.customerRepository.findAll(params);
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
    // Check if email already exists
    const emailExists = await this.customerRepository.emailExists(data.email);
    if (emailExists) {
      throw new ConflictError('Email already registered');
    }

    // Create customer instance for validation
    const customer = new Customer();
    Object.assign(customer, data);

    // Validate
    const errors = await validate(customer);
    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      throw new ValidationError(errorMessages);
    }

    return this.customerRepository.create(data);
  }

  async updateCustomer(id: string, data: UpdateCustomerDTO): Promise<Customer> {
    // Check if customer exists
    const exists = await this.customerRepository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }

    // Check email uniqueness if email is being updated
    if (data.email) {
      const emailExists = await this.customerRepository.emailExists(data.email, id);
      if (emailExists) {
        throw new ConflictError('Email already registered');
      }
    }

    // Validate updated data
    const customer = new Customer();
    Object.assign(customer, data);

    const errors = await validate(customer, { skipMissingProperties: true });
    if (errors.length > 0) {
      const errorMessages = errors
        .map(error => Object.values(error.constraints || {}).join(', '))
        .join('; ');
      throw new ValidationError(errorMessages);
    }

    const updatedCustomer = await this.customerRepository.update(id, data);

    if (!updatedCustomer) {
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }

    return updatedCustomer;
  }

  async deleteCustomer(id: string): Promise<void> {
    const exists = await this.customerRepository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }

    const deleted = await this.customerRepository.delete(id);
    if (!deleted) {
      throw new Error('Failed to delete customer');
    }
  }
}
