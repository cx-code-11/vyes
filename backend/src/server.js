import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import {connectDB, disconnectDB} from './config/db.js';


connectDB();

// import routes
import initialRoutes from './routes/initialRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/payments', payment);
app.use('/orders', order);
app.use('/', initialRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    if(server){
        server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
    }
})

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err);
    await disconnectDB();
    process.exit(1);
})

process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down gracefully...");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});