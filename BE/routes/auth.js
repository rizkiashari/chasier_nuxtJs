import express from "express";
import { register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
// router.post("/login", register);

export default router;
