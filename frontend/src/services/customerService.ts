import { api } from './api';
import {
  Customer,
  CreateCustomerDTO,
  UpdateCustomerDTO,
  PaginatedResponse,
  ApiResponse,
} from '../types';

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const customerService = {
  async getCustomers(params: GetCustomersParams = {}): Promise<PaginatedResponse<Customer>> {
    const { page = 1, limit = 10, search = '' } = params;
    const response = await api.get<ApiResponse<PaginatedResponse<Customer>>>('/customers', {
      params: { page, limit, search },
    });
    return response.data.data;
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
    return response.data.data;
  },

  async createCustomer(data: CreateCustomerDTO): Promise<Customer> {
    const response = await api.post<ApiResponse<Customer>>('/customers', data);
    return response.data.data;
  },

  async updateCustomer(id: string, data: UpdateCustomerDTO): Promise<Customer> {
    const response = await api.put<ApiResponse<Customer>>(`/customers/${id}`, data);
    return response.data.data;
  },

  async deleteCustomer(id: string): Promise<void> {
    await api.delete(`/customers/${id}`);
  },
};
