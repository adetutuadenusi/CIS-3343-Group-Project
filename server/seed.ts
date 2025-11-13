import { db } from './db';
import { employees, customers, orders } from '../shared/schema';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const DEMO_PASSWORD = 'DemoPass123!';

function generateTrackingToken(): string {
  return crypto.randomBytes(16).toString('hex');
}

async function seedDatabase() {
  console.log('🌱 Seeding database with demo staff accounts and sample data...\n');

  try {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

    // 1. Seed Staff Accounts
    console.log('📋 Creating staff accounts...');
    const demoStaff = [
      { email: 'emily@emilybakes.com', passwordHash, name: 'Emily Baker', role: 'owner', isActive: true },
      { email: 'manager@emilybakes.com', passwordHash, name: 'James Wilson', role: 'manager', isActive: true },
      { email: 'sales@emilybakes.com', passwordHash, name: 'Sarah Martinez', role: 'sales', isActive: true },
      { email: 'baker@emilybakes.com', passwordHash, name: 'Tom Anderson', role: 'baker', isActive: true },
      { email: 'decorator@emilybakes.com', passwordHash, name: 'Lisa Chen', role: 'decorator', isActive: true },
      { email: 'accountant@emilybakes.com', passwordHash, name: 'Dan Roberts', role: 'accountant', isActive: true },
    ];

    const staffIds: Record<string, number> = {};

    for (const staff of demoStaff) {
      const existing = await db.query.employees.findFirst({
        where: (employees, { eq }) => eq(employees.email, staff.email),
      });

      if (existing) {
        console.log(`⏭️  ${staff.name} (${staff.role}) already exists`);
        staffIds[staff.role] = existing.id;
      } else {
        const [newStaff] = await db.insert(employees).values(staff).returning();
        console.log(`✅ Created ${staff.name} (${staff.role})`);
        staffIds[staff.role] = newStaff.id;
      }
    }

    // 2. Seed Sample Customers
    console.log('\n📋 Creating sample customers...');
    const demoCustomers = [
      { name: 'Jennifer Lopez', email: 'jennifer.lopez@example.com', phone: '(555) 123-4567', totalOrders: 3, isVip: true },
      { name: 'Michael Chen', email: 'michael.chen@example.com', phone: '(555) 234-5678', totalOrders: 2, isVip: false },
      { name: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '(555) 345-6789', totalOrders: 1, isVip: false },
      { name: 'Corporate Events Inc', email: 'events@corporate.com', phone: '(555) 456-7890', totalOrders: 5, isVip: true },
      { name: 'David Martinez', email: 'david.m@example.com', phone: '(555) 567-8901', totalOrders: 1, isVip: false },
    ];

    const customerIds: number[] = [];

    for (const customer of demoCustomers) {
      const existing = await db.query.customers.findFirst({
        where: (customers, { eq }) => eq(customers.email, customer.email),
      });

      if (existing) {
        console.log(`⏭️  ${customer.name} already exists`);
        customerIds.push(existing.id);
      } else {
        const [newCustomer] = await db.insert(customers).values(customer).returning();
        console.log(`✅ Created customer: ${customer.name}`);
        customerIds.push(newCustomer.id);
      }
    }

    // 3. Seed Sample Orders
    console.log('\n📋 Creating sample orders...');
    const demoOrders = [
      {
        customerId: customerIds[0],
        orderType: 'custom',
        occasion: 'wedding',
        design: 'elegant-tiered',
        servings: 150,
        totalAmount: 45000,
        depositAmount: 22500,
        balanceDue: 22500,
        status: 'decorating',
        priority: 'high',
        eventDate: new Date('2025-11-20'),
        layers: JSON.stringify([
          { flavor: 'vanilla', fillings: ['raspberry', 'buttercream'], notes: 'Extra raspberry' },
          { flavor: 'chocolate', fillings: ['ganache'], notes: '' },
        ]),
        trackingToken: generateTrackingToken(),
        assignedBaker: staffIds.baker,
        assignedDecorator: staffIds.decorator,
        paymentStatus: 'partial',
        depositMet: true,
      },
      {
        customerId: customerIds[1],
        orderType: 'custom',
        occasion: 'birthday',
        design: 'modern-geometric',
        servings: 50,
        totalAmount: 12000,
        depositAmount: 6000,
        balanceDue: 6000,
        status: 'baking',
        priority: 'medium',
        eventDate: new Date('2025-11-18'),
        layers: JSON.stringify([{ flavor: 'red-velvet', fillings: ['cream-cheese'], notes: '' }]),
        trackingToken: generateTrackingToken(),
        assignedBaker: staffIds.baker,
        paymentStatus: 'partial',
        depositMet: true,
      },
      {
        customerId: customerIds[2],
        orderType: 'custom',
        occasion: 'anniversary',
        design: 'floral-romance',
        servings: 30,
        totalAmount: 8500,
        depositAmount: 4250,
        balanceDue: 4250,
        status: 'pending',
        priority: 'medium',
        eventDate: new Date('2025-11-22'),
        layers: JSON.stringify([{ flavor: 'lemon', fillings: ['lemon-curd', 'buttercream'], notes: 'Light and fresh' }]),
        trackingToken: generateTrackingToken(),
        paymentStatus: 'partial',
        depositMet: true,
      },
      {
        customerId: customerIds[3],
        orderType: 'custom',
        occasion: 'corporate',
        design: 'minimalist-chic',
        servings: 200,
        totalAmount: 55000,
        depositAmount: 27500,
        balanceDue: 27500,
        status: 'ready',
        priority: 'high',
        eventDate: new Date('2025-11-16'),
        layers: JSON.stringify([
          { flavor: 'vanilla', fillings: ['buttercream'], notes: 'Company logo on top' },
          { flavor: 'chocolate', fillings: ['mocha'], notes: '' },
        ]),
        trackingToken: generateTrackingToken(),
        assignedBaker: staffIds.baker,
        assignedDecorator: staffIds.decorator,
        paymentStatus: 'paid',
        depositMet: true,
      },
      {
        customerId: customerIds[4],
        orderType: 'custom',
        occasion: 'graduation',
        design: 'colorful-celebration',
        servings: 40,
        totalAmount: 9500,
        depositAmount: 4750,
        balanceDue: 4750,
        status: 'completed',
        priority: 'low',
        eventDate: new Date('2025-11-10'),
        layers: JSON.stringify([{ flavor: 'funfetti', fillings: ['vanilla', 'sprinkles'], notes: 'Extra colorful!' }]),
        trackingToken: generateTrackingToken(),
        assignedBaker: staffIds.baker,
        assignedDecorator: staffIds.decorator,
        paymentStatus: 'paid',
        depositMet: true,
      },
    ];

    for (const order of demoOrders) {
      const [newOrder] = await db.insert(orders).values(order).returning();
      console.log(`✅ Created order #${newOrder.id} (${order.status}) for customer #${order.customerId}`);
    }

    console.log('\n✨ Database seeding complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   - 6 staff accounts created`);
    console.log(`   - 5 demo customers created`);
    console.log(`   - 5 sample orders created`);
    console.log(`\n🔑 Demo password for all staff: ${DEMO_PASSWORD}\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
