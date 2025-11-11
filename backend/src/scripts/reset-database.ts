import { AppDataSource } from '../config/database';
import { Customer } from '../entities/Customer';
import { seedDatabase } from '../config/seed';

async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...');

    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const customerRepository = AppDataSource.getRepository(Customer);

    // Delete all customers
    const deleteResult = await customerRepository.delete({});
    console.log(`🗑️  Deleted ${deleteResult.affected || 0} customers`);

    // Seed with initial data
    await seedDatabase();

    console.log('✅ Database reset complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
