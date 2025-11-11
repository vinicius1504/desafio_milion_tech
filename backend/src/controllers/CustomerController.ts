import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/CustomerService';
import { BadRequestError } from '../errors/AppError';

export class CustomerController {
  private customerService: CustomerService;

  constructor() {
    this.customerService = new CustomerService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      if (page < 1 || limit < 1) {
        throw new BadRequestError('Page and limit must be positive integers');
      }

      const result = await this.customerService.getAllCustomers({
        page,
        limit,
        search,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const customer = await this.customerService.getCustomerById(id);

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone, address } = req.body;

      if (!name || !email || !phone || !address) {
        throw new BadRequestError('All fields are required: name, email, phone, address');
      }

      const customer = await this.customerService.createCustomer({
        name,
        email,
        phone,
        address,
      });

      res.status(201).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email, phone, address } = req.body;

      const customer = await this.customerService.updateCustomer(id, {
        name,
        email,
        phone,
        address,
      });

      res.status(200).json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.customerService.deleteCustomer(id);

      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
