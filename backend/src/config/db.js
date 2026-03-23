import pkg from 'pg';
const { Pool } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import prismaPkg from '../generated/prisma/index.js';

const { PrismaClient } = prismaPkg;

if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: DATABASE_URL is not defined in .env file");
}

// 1. Create a standard Postgres connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient
const prisma = new PrismaClient({ adapter });

export const connectDB = async () => {
    try {
        // In Prisma 7, $connect verifies the adapter is working
        await prisma.$connect();
        console.log("Prisma 7: Connected to PostgreSQL via Driver Adapter");
    } catch (err) {
        console.error("Connection Error:", err.message);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
    await pool.end();
};

export default prisma;