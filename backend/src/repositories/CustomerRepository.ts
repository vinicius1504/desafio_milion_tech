import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Customer } from '../entities/Customer';

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export class CustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Customer);
  }

  async findAll(params: PaginationParams): Promise<PaginatedResult<Customer>> {
    const { page, limit, search } = params;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('customer');

    if (search) {
      queryBuilder.where(
        'customer.name ILIKE :search OR customer.email ILIKE :search OR customer.phone ILIKE :search',
        { search: `%${search}%` }
      );
    }

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('customer.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Customer | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.repository.create(customerData);
    return this.repository.save(customer);
  }

  async update(id: string, customerData: Partial<Customer>): Promise<Customer | null> {
    await this.repository.update(id, customerData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }

  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const queryBuilder = this.repository
      .createQueryBuilder('customer')
      .where('customer.email = :email', { email });

    if (excludeId) {
      queryBuilder.andWhere('customer.id != :excludeId', { excludeId });
    }

    const count = await queryBuilder.getCount();
    return count > 0;
  }
}
