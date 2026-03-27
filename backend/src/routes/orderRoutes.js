import express from 'express';
import prisma from '../config/db.js';

const router = express.Router();

router.get('/quoteRequests', async (req, res) => {
    try {
        const quoteRequests = await prisma.order.findMany({
            where: { 
                orderStatus: 'QuoteRequested' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                }
            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(quoteRequests);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load quote requests" });
    }
});

router.get('/quoteSend', async (req, res) => {
    try {
        const quoteSend = await prisma.order.findMany({
            where: { 
                orderStatus: 'QuoteSend' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                }
            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(quoteSend);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load quote send requests" });
    }
});

router.get('/assigningVendor', async (req, res) => {
    try {
        const assigningVendor = await prisma.order.findMany({
            where: { 
                orderStatus: 'AssigningVendor' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                }
            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(assigningVendor);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load assigning vendor requests" });
    }
});

router.get('/vendorAccepted', async (req, res) => {
    try {
        const vendorAccepted = await prisma.order.findMany({
            where: { 
                orderStatus: 'VendorAccepted' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                },
                vendor: {
                    select: {
                        businessName: true // Maps to "Vendor Name"
                    }
                }

            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(vendorAccepted);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load vendor accepted requests" });
    }
});

router.get('/inProgress', async (req, res) => {
    try {
        const inProgress = await prisma.order.findMany({
            where: { 
                orderStatus: 'InProgress' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                },
                vendor: {
                    select: {
                        businessName: true // Maps to "Vendor Name"
                    }
                }

            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(inProgress);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load order in progress requests" });
    }
});

router.get('/completed', async (req, res) => {
    try {
        const completed = await prisma.order.findMany({
            where: { 
                orderStatus: 'Completed' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                },
                vendor: {
                    select: {
                        businessName: true // Maps to "Vendor Name"
                    }
                }

            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(completed);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load order completed requests" });
    }
});

router.get('/cancelled', async (req, res) => {
    try {
        const cancelled = await prisma.order.findMany({
            where: { 
                orderStatus: 'Cancelled' 
            },
            select: {
                uiId: true,        // Maps to "Order ID" (e.g., ORD-8546)
                serviceTime: true, // Maps to "Date & Time"
                amount: true,      // Maps to "Amount"
                customer: {
                    select: { 
                        name: true,
                        created: true // Keep this to calculate the "New" badge
                    }
                },
                service: {
                    select: { 
                        name: true // Maps to "Service" (e.g., AC Deep Clean)
                    }
                },
            },
            orderBy: { 
                serviceTime: 'asc' // Usually better to show the soonest jobs first
            }
        });

        res.json(cancelled);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load order cancelled requests" });
    }
});

router.get('/assigningVendor/byService', async (req, res) => {
    const { serviceModeId } = req.query;
    try {
        const vendorByService = await prisma.vendorService.findMany({
            where: { 
                serviceModeIdFk: serviceModeId
            },
            select: {
                vendor: {
                    select: { 
                        businessName: true,
                        rating: true,

                    }
                },
            },
        });

        res.json(vendorByService);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ error: "Could not load order cancelled requests" });
    }
});

// create a new order with status "QuoteRequested"
// const createQuotationRequest = async () => {
//   try {
//     const newOrder = await prisma.order.create({
//       data: {
//         uiId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // Generates a random ID like ORD-8546
//         serviceTime: new Date("2026-04-10T11:00:00Z"),        // The scheduled time for the job
//         orderStatus: "QuoteRequested",                         // Must match your Enum exactly
        
//         // Link to existing records using their IDs
//         customer: {
//           connect: { id: "cust-1" } // Replace with your actual Customer UUID
//         },
//         service: {
//           connect: { id: "svc-1" }  // Replace with your actual Service UUID
//         },

//         // Optional: You can add a note or image URL if the user provided one
//         note: "Customer requested deep cleaning for the balcony specifically.",
//         imgVideoUrl: "https://example.com/site-photo.jpg"
//       }
//     });

//     console.log("✅ Order created successfully:", newOrder.uiId);
//     return newOrder;
//   } catch (error) {
//     console.error("❌ Error creating order:", error);
//   }
// };



export default router;