import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting production-ready seed...");

  // 1. ADMIN
  const admin = await prisma.admin.upsert({
    where: { adminUiId: 'ADM-001' },
    update: {},
    create: {
      uiId: 'admin-main-ui',
      adminUiId: 'ADM-001',
      name: 'Vyess Master Admin',
      phoneNumber: '9000000000',
      email: 'admin@vyess.com',
      address: 'Vyess HQ, Chennai',
      dob: new Date('1990-01-01'),
      aadharNumber: '123412341234',
      salary: 75000,
      username: 'vyess_admin',
      password: 'hashed_password_here', // Use bcrypt in real scenarios
    },
  });

  // 2. SERVICE CATEGORY
  const cat = await prisma.serviceCategory.upsert({
    where: { id: 'cat-cleaning-01' },
    update: {},
    create: {
      id: 'cat-cleaning-01',
      name: 'Cleaning Services',
      imgVideoUrl: 'https://cdn.vyess.com/cat-cleaning.jpg',
      isActive: true,
    },
  });

  // 3. SERVICE
  const svc = await prisma.service.upsert({
    where: { id: 'svc-home-deep-01' },
    update: {},
    create: {
      id: 'svc-home-deep-01',
      name: 'Full Home Deep Cleaning',
      serviceCategoryIdFk: cat.id,
      isActive: true,
    },
  });

  // 4. SERVICE MODE (The specific "Plan")
  const mode = await prisma.serviceMode.upsert({
    where: { id: 'mode-1bhk-01' },
    update: {},
    create: {
      id: 'mode-1bhk-01',
      name: '1 BHK Standard',
      description: 'Professional cleaning for 1 BHK apartments',
      what: 'Kitchen, Bathroom, Hall, Balcony',
      why: 'Removes 99% allergens and deep stains',
      best: 'Small apartments',
      amount: 2999,
      serviceIdFk: svc.id,
      isActive: true,
    },
  });

  // 5. VENDOR
  const vendor = await prisma.vendor.upsert({
    where: { uiId: 'V-PRO-99' },
    update: {},
    create: {
      uiId: 'V-PRO-99',
      businessName: 'Sparkle Tech Solutions',
      representativeName: 'Arun Kumar',
      phoneNumber: '9876543210',
      email: 'arun@sparkletech.com',
      address: 'Tech Park, Bangalore',
      rating: 4.9,
      employeeCount: 15,
      level: 1,
      aadharNumber: '555544443333',
      panNumber: 'ABCDE1234F',
      username: 'arun_vendor',
      password: 'vendor_password_123',
    },
  });

  // 6. LINK VENDOR TO SERVICE MODE
  await prisma.vendorService.upsert({
    where: {
      vendorIdFk_serviceModeIdFk: {
        vendorIdFk: vendor.id,
        serviceModeIdFk: mode.id,
      },
    },
    update: {},
    create: {
      vendorIdFk: vendor.id,
      serviceModeIdFk: mode.id,
      price: 2500,
      experienceYears: 4,
    },
  });

  // 7. CUSTOMER
  const customer = await prisma.customer.upsert({
    where: { uiId: 'CUST-001' },
    update: {},
    create: {
      uiId: 'CUST-001',
      name: 'John Doe',
      phoneNumber: '9988776655',
      email: 'john@gmail.com',
      address: 'Green Meadows Apts, Sector 4',
      username: 'john_customer',
      password: 'customer_password',
    },
  });

  // 8. ORDER (Putting it all together)
  await prisma.order.upsert({
    where: { uiId: 'ORD-TEST-01' },
    update: {},
    create: {
      uiId: 'ORD-TEST-01',
      serviceIdFk: svc.id,
      vendorIdFk: vendor.id,
      customerIdFk: customer.id,
      serviceTime: new Date('2026-04-01T10:00:00Z'),
      amount: 2999,
      orderStatus: 'QuoteRequested',
    },
  });

  console.log("✅ Database seeded with a complete Order lifecycle!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });