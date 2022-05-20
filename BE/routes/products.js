import express from "express";
import { index, store } from "../controllers/ProductController.js";

const router = express.Router();

router.get("/", index);
router.post("/", store);

export default router;
