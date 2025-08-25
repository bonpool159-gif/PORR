import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo users
  const ownerPassword = await hashPassword('password');
  const cashierPassword = await hashPassword('password');
  const courierPassword = await hashPassword('password');

  // Create owner user
  const owner = await prisma.user.upsert({
    where: { email: 'owner@demo.com' },
    update: {},
    create: {
      name: 'John Owner',
      email: 'owner@demo.com',
      phone: '+1234567890',
      role: 'OWNER',
      passwordHash: ownerPassword,
    },
  });

  // Create cashier user
  const cashier = await prisma.user.upsert({
    where: { email: 'cashier@demo.com' },
    update: {},
    create: {
      name: 'Jane Cashier',
      email: 'cashier@demo.com',
      phone: '+1234567891',
      role: 'CASHIER',
      passwordHash: cashierPassword,
    },
  });

  // Create courier user
  const courier = await prisma.user.upsert({
    where: { email: 'courier@demo.com' },
    update: {},
    create: {
      name: 'Mike Courier',
      email: 'courier@demo.com',
      phone: '+1234567892',
      role: 'COURIER',
      passwordHash: courierPassword,
    },
  });

  // Create demo store
  const store = await prisma.store.upsert({
    where: { slug: 'pizza-palace' },
    update: {},
    create: {
      name: 'Pizza Palace',
      slug: 'pizza-palace',
      description: 'Authentic Italian pizza and more',
      address: '123 Main Street, Downtown, City',
      phone: '+1234567893',
      email: 'info@pizzapalace.com',
      ownerId: owner.id,
      latitude: 40.7128,
      longitude: -74.0060,
      deliveryFee: 2.99,
      freeDeliveryMin: 25.00,
      maxDeliveryRadius: 5.0,
      taxRate: 0.08,
      serviceFee: 1.50,
      openingHours: {
        monday: { open: '09:00', close: '22:00', isOpen: true },
        tuesday: { open: '09:00', close: '22:00', isOpen: true },
        wednesday: { open: '09:00', close: '22:00', isOpen: true },
        thursday: { open: '09:00', close: '22:00', isOpen: true },
        friday: { open: '09:00', close: '23:00', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '11:00', close: '21:00', isOpen: true },
      },
    },
  });

  // Add cashier to store staff
  await prisma.storeStaff.upsert({
    where: {
      storeId_userId: {
        storeId: store.id,
        userId: cashier.id,
      },
    },
    update: {},
    create: {
      storeId: store.id,
      userId: cashier.id,
      role: 'CASHIER',
    },
  });

  // Create menu categories
  const pizzaCategory = await prisma.category.upsert({
    where: { id: 'pizza-category' },
    update: {},
    create: {
      id: 'pizza-category',
      name: 'Pizzas',
      description: 'Delicious handcrafted pizzas',
      storeId: store.id,
      sortOrder: 1,
    },
  });

  const drinkCategory = await prisma.category.upsert({
    where: { id: 'drink-category' },
    update: {},
    create: {
      id: 'drink-category',
      name: 'Beverages',
      description: 'Refreshing drinks',
      storeId: store.id,
      sortOrder: 2,
    },
  });

  const dessertCategory = await prisma.category.upsert({
    where: { id: 'dessert-category' },
    update: {},
    create: {
      id: 'dessert-category',
      name: 'Desserts',
      description: 'Sweet treats',
      storeId: store.id,
      sortOrder: 3,
    },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 14.99,
        categoryId: pizzaCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 1,
        variants: {
          sizes: [
            { name: 'Small', price: 0 },
            { name: 'Medium', price: 3 },
            { name: 'Large', price: 6 },
          ],
        },
        modifiers: {
          extras: [
            { name: 'Extra Cheese', price: 2 },
            { name: 'Pepperoni', price: 3 },
            { name: 'Mushrooms', price: 2 },
          ],
        },
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni pizza with mozzarella cheese',
        price: 16.99,
        categoryId: pizzaCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 2,
        variants: {
          sizes: [
            { name: 'Small', price: 0 },
            { name: 'Medium', price: 3 },
            { name: 'Large', price: 6 },
          ],
        },
      },
      {
        name: 'Veggie Supreme',
        description: 'Loaded with fresh vegetables and herbs',
        price: 18.99,
        categoryId: pizzaCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 3,
      },
      {
        name: 'Coca Cola',
        description: 'Classic refreshing cola',
        price: 2.99,
        categoryId: drinkCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 1,
        variants: {
          sizes: [
            { name: 'Small', price: 0 },
            { name: 'Large', price: 1 },
          ],
        },
      },
      {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        categoryId: drinkCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 2,
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 6.99,
        categoryId: dessertCategory.id,
        storeId: store.id,
        imageUrl: 'https://images.pexels.com/photos/6136086/pexels-photo-6136086.jpeg?auto=compress&cs=tinysrgb&w=400',
        sortOrder: 1,
      },
    ],
    skipDuplicates: true,
  });

  // Create demo customers
  await prisma.customer.createMany({
    data: [
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1234567894',
        address: '456 Oak Street, Suburb, City',
        storeId: store.id,
        segments: ['frequent-buyer'],
        loyaltyPoints: 150,
        totalOrders: 12,
        totalSpent: 180.50,
      },
      {
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '+1234567895',
        address: '789 Pine Avenue, District, City',
        storeId: store.id,
        segments: ['new-customer'],
        loyaltyPoints: 25,
        totalOrders: 3,
        totalSpent: 45.99,
      },
    ],
    skipDuplicates: true,
  });

  // Create demo coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        type: 'PERCENTAGE',
        value: 10,
        minOrderValue: 15,
        usageLimit: 100,
        storeId: store.id,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
      {
        code: 'FREEDEL',
        type: 'FREE_DELIVERY',
        value: 0,
        minOrderValue: 20,
        usageLimit: 50,
        storeId: store.id,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
  console.log('\nDemo accounts:');
  console.log('Owner: owner@demo.com / password');
  console.log('Cashier: cashier@demo.com / password');
  console.log('Courier: courier@demo.com / password');
  console.log('\nDemo store: Pizza Palace');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });