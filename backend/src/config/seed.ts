import { AppDataSource } from './database';
import { Customer } from '../entities/Customer';

const initialCustomers = [
  {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo, SP',
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '(21) 99876-5432',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '(11) 97654-3210',
    address: 'Rua Augusta, 500 - São Paulo, SP',
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(21) 96543-2109',
    address: 'Av. Atlântica, 2000 - Rio de Janeiro, RJ',
  },
  {
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@email.com',
    phone: '(11) 95432-1098',
    address: 'Rua Oscar Freire, 800 - São Paulo, SP',
  },
];

export async function seedDatabase(): Promise<void> {
  try {
    const customerRepository = AppDataSource.getRepository(Customer);

    // Verificar se já existem clientes no banco
    const count = await customerRepository.count();

    if (count > 0) {
      console.log('✅ Database already has customers, skipping seed');
      return;
    }

    console.log('🌱 Seeding database with initial customers...');

    // Criar clientes iniciais
    for (const customerData of initialCustomers) {
      const customer = customerRepository.create(customerData);
      await customerRepository.save(customer);
      console.log(`  ✓ Created customer: ${customerData.name}`);
    }

    console.log(`✅ Database seeded successfully with ${initialCustomers.length} customers`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
