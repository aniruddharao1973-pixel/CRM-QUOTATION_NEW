// src/modules/quotation/quotation.routes.js

import express from "express";
import {
  createQuotationController,
  getQuotationsController,
  getQuotationByIdController,
  getQuotationHistoryController,
  updateQuotationController,
  deleteQuotationController,
  submitQuotationController,
  approveQuotationController,
  rejectQuotationController,
} from "./quotation.controller.js";

import { protect, authorize } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", protect, createQuotationController);

/* ================= GET ALL ================= */
router.get("/", protect, getQuotationsController);

/* ================= GET HISTORY ================= */
// 🔥 IMPORTANT: place BEFORE "/:id"
router.get("/history/:quotationNo", protect, getQuotationHistoryController);

/* ================= APPROVAL FLOW ================= */
// 🔒 SALES REP ONLY
router.post(
  "/:id/submit",
  protect,
  authorize("SALES_REP"),
  submitQuotationController,
);

// 🔒 ADMIN ONLY
router.post(
  "/:id/approve",
  protect,
  authorize("ADMIN"),
  approveQuotationController,
);
router.post(
  "/:id/reject",
  protect,
  authorize("ADMIN"),
  rejectQuotationController,
);

/* ================= GET ONE ================= */
router.get("/:id", protect, getQuotationByIdController);

/* ================= UPDATE ================= */
router.put("/:id", protect, updateQuotationController);

/* ================= DELETE ================= */
router.delete("/:id", protect, authorize("ADMIN"), deleteQuotationController);

export default router;
