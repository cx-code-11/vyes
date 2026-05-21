import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

const generateUiId = () => `VR-${Math.floor(10000 + Math.random() * 90000)}`;

router.get('/', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

router.post('/vendor-registration', async (req, res) => {
  try {
    const {
      businessName,
      contactPerson,
      email,
      phone,
      address,
      accountHolderName,
      accountNumber,
      ifscCode,
      upiId,
      gstNumber,
      aadhar,
      pan,
      services
    } = req.body;

    if (!businessName || !contactPerson || !email || !phone || !address || !accountHolderName || !accountNumber || !ifscCode || !upiId || !aadhar || !pan || !Array.isArray(services)) {
      return res.status(400).json({ error: 'Missing required registration fields' });
    }

    const existingUiId = await prisma.vendorRegistrationRequest.findUnique({
      where: { uiId: generateUiId() }
    });

    const uiId = existingUiId ? `VR-${Date.now()}` : generateUiId();

    const newRegistration = await prisma.vendorRegistrationRequest.create({
      data: {
        uiId,
        businessName,
        contactPerson,
        email,
        phone,
        address,
        accountHolderName,
        accountNumber,
        ifscCode,
        upiId,
        gstNumber,
        aadhar,
        pan,
        services
      }
    });

    res.status(201).json({ message: 'Registration request saved', data: newRegistration });
  } catch (error) {
    console.error('Save Registration Error:', error);
    res.status(500).json({ error: 'Could not save registration request' });
  }
});

router.get('/vendor-registration', async (req, res) => {
  try {
    const requests = await prisma.vendorRegistrationRequest.findMany({
      orderBy: { created: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    console.error('Fetch Vendor Registrations Error:', error);
    res.status(500).json({ error: 'Could not load registration requests' });
  }
});

// router.post('/register', async (req, res) => {
//     try {
//         const { email, name } = req.body;

//         // The actual Prisma Create call
//         const newUser = await prisma.user.create({
//             data: {
//                 email: email,
//                 name: name,
//             },
//         });

//         res.status(201).json({
//             message: "User created successfully!",
//             user: newUser
//         });

//     } catch (error) {
//         // Handle unique constraint errors (e.g., email already exists)
//         if (error.code === 'P2002') {
//             return res.status(400).json({ error: "Email already exists" });
//         }
        
//         console.error("Create User Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// router.get('/users', async (req, res) => {
//     try {
//         const users = await prisma.user.findMany({
//             orderBy: { createdAt: 'desc' } // Sort by newest first
//         });
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch users" });
//     }
// });

// 2. GET SINGLE USER BY ID
// router.get('/users/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await prisma.user.findUnique({
//             where: { id: id } // Convert string param to integer
//         });

//         if (!user) return res.status(404).json({ error: "User not found" });
        
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Error retrieving user" });
//     }
// });

export default router;