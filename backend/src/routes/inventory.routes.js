
import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
  list,
  byProduct,
  update,
} from "../controllers/inventory.controller.js";

const router = Router();

// Get all inventory for logged-in company
router.get("/", requireAuth, list);

// Get inventory for a specific product
router.get("/product/:productId", requireAuth, byProduct);

// Update inventory quantity
router.put("/:id", requireAuth, update);

export default router;

