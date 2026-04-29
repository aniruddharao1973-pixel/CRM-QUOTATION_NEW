// src/modules/item/item.routes.js

import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./item.controller.js";

import { protect, authorize } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* ================= CREATE ================= */
router.post("/", protect, createItem);

/* ================= READ ================= */
router.get("/", protect, getItems);
router.get("/:id", protect, getItemById);

/* ================= UPDATE ================= */
router.put("/", protect, updateItem);

/* ================= DELETE ================= */
router.delete("/:id", protect, authorize("ADMIN"), deleteItem);

export default router;