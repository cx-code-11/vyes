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

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.post('/api/upload', upload.fields([{ name: 'aadhaar' }, { name: 'pan' }, { name: 'gst' }, { name: 'agreement' }]), (req, res) => {
  try {
    const urls = {};
    const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
    
    if (req.files.aadhaar) urls.aadhaar = baseUrl + req.files.aadhaar[0].filename;
    if (req.files.pan) urls.pan = baseUrl + req.files.pan[0].filename;
    if (req.files.gst) urls.gst = baseUrl + req.files.gst[0].filename;
    if (req.files.agreement) urls.agreement = baseUrl + req.files.agreement[0].filename;

    res.json({ urls });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

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