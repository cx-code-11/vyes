import prisma from './src/config/db.js';
async function main() {
  await prisma.vendorRegistrationRequest.deleteMany({});
  console.log('Deleted all records in VendorRegistrationRequest');
}
main().catch(console.error).finally(() => prisma.$disconnect());
