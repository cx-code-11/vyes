import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

router.get('/vendorsPayoutPending', async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            where: { 
                status: "pending"
            },
            select: {
                count: true,
                created: true,
                amount: true,
                vendor: {
                    select: { 
                        businessName: true,
                        bankDetails: true
                    }
                },
            },
            groupBy: {
                vendorId: true
             }
        });

        res.json(payments);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load vendors payout pending requests" });
    }
});



export default router;