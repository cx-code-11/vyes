import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

const generateUiId = () => `VR-${Math.floor(10000 + Math.random() * 90000)}`;

const generateUniqueUiId = async () => {
  let uiId = generateUiId();
  let existing = await prisma.vendorRegistrationRequest.findUnique({
    where: { uiId }
  });

  while (existing) {
    uiId = generateUiId();
    existing = await prisma.vendorRegistrationRequest.findUnique({
      where: { uiId }
    });
  }

  return uiId;
};

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

    const uiId = await generateUniqueUiId();

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
    res.status(500).json({
      error: error.message || 'Could not save registration request',
      code: error.code || null,
      meta: error.meta || null
    });
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

router.get('/vendor-registration/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const request = await prisma.vendorRegistrationRequest.findUnique({
      where: { id }
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json(request);
  } catch (error) {
    console.error('Fetch Single Registration Error:', error);
    res.status(500).json({ error: 'Could not load registration details' });
  }
});

router.post('/admin-login', async (req, res) => {
  try {
    const { username, phoneNumber, email, password } = req.body;

    if (!password || (!username && !phoneNumber && !email)) {
      return res.status(400).json({ error: 'username, phoneNumber, or email and password are required' });
    }

    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPhone = phoneNumber?.replace(/\D/g, '')?.trim();
    const normalizedUsername = username?.trim();

    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          normalizedUsername ? { username: normalizedUsername } : undefined,
          normalizedPhone ? { phoneNumber: normalizedPhone } : undefined,
          normalizedEmail ? { email: normalizedEmail } : undefined,
        ].filter(Boolean),
      },
    });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...safeAdmin } = admin;
    res.json({ message: 'Login successful', admin: safeAdmin });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Unable to validate login' });
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