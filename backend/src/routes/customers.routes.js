import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import prisma from "../utils/prisma.js";
import { negotiate } from "./../controllers/negotiation.controller.js";
import { confirm } from "../controllers/quotation.controller.js";

const router = Router();

// GET /api/customer/quotations - Get customer's own quotations
router.get("/quotations", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user with customerId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true, companyId: true }
    });

    // If no customerId, return empty array
    if (!user?.customerId) {
      return res.json({
        success: true,
        data: [],
        message: "No customer profile linked to this user"
      });
    }

    // Fetch quotations for this customer
    const quotations = await prisma.quotation.findMany({
      where: {
        companyId: user.companyId,
        customerId: user.customerId,
      },
      include: {
        customer: true,
        items: {
          include: { product: true }
        },
        dealHealth: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: quotations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotations",
      error: error.message
    });
  }
});

// GET /api/customer/quotations/:id - Get specific quotation
router.get("/quotations/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Get user with customerId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true, companyId: true }
    });

    if (!user?.customerId) {
      return res.status(400).json({
        success: false,
        message: "No customer profile linked to this user"
      });
    }

    // Fetch specific quotation
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: { product: true }
        },
        dealHealth: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        versions: {
          orderBy: { versionNumber: 'desc' }
        },
        negotiations: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    // Check if quotation belongs to this customer
    if (!quotation || quotation.customerId !== user.customerId) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found or access denied"
      });
    }

    res.json({ success: true, data: quotation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotation",
      error: error.message
    });
  }
});

// POST /api/customer/quotations/:id/negotiate - Submit negotiation
router.post("/quotations/:id/negotiate", requireAuth, requireRole("CUSTOMER"), negotiate);
/*
router.post("/quotations/:id/negotiate", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { requestedDiscountPercent, message } = req.body;

    // Get user with customerId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true, companyId: true }
    });

    if (!user?.customerId) {
      return res.status(400).json({
        success: false,
        message: "No customer profile linked to this user"
      });
    }

    // Get quotation
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: { customer: true }
    });

    if (!quotation || quotation.customerId !== user.customerId) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found or access denied"
      });
    }

    // Create negotiation record
    const negotiation = await prisma.negotiation.create({
      data: {
        quotationId: id,
        customerId: user.customerId,
        requestedDiscountPercent: requestedDiscountPercent || 0,
        message: message || "Requesting changes to quotation",
        versionNumber: quotation.versionNumber + 1
      }
    });

    // Update quotation status
    const updatedQuotation = await prisma.quotation.update({
      where: { id },
      data: {
        status: "NEGOTIATION",
        versionNumber: quotation.versionNumber + 1
      }
    });

    res.json({
      success: true,
      message: "Negotiation submitted successfully",
      data: { negotiation, quotation: updatedQuotation }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit negotiation",
      error: error.message
    });
  }
}); */

// POST /api/customer/quotations/:id/confirm - Confirm quotation
/* router.post("/quotations/:id/confirm", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { customerId: true }
    });

    if (!user?.customerId) {
      return res.status(400).json({
        success: false,
        message: "No customer profile linked to this user"
      });
    }

    const quotation = await prisma.quotation.findUnique({
      where: { id }
    });

    if (!quotation || quotation.customerId !== user.customerId) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found or access denied"
      });
    }

    const updatedQuotation = await prisma.quotation.update({
      where: { id },
      data: {
        status: "CUSTOMER_ACCEPTED"
      }
    });

    res.json({
      success: true,
      message: "Quotation confirmed successfully",
      data: updatedQuotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to confirm quotation",
      error: error.message
    });
  }
}); */
router.post("/quotations/:id/confirm", requireAuth, requireRole("CUSTOMER"), confirm);

// GET /api/customer/profile - Get customer profile
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customer: { include: { company: true } }
      }
    });

    if (!user?.customer) {
      return res.status(400).json({
        success: false,
        message: "No customer profile found"
      });
    }

    res.json({
      success: true,
      data: {
        ...user.customer,
        user: { name: user.name, email: user.email, role: user.role, active: user.active }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message
    });
  }
});

export default router;