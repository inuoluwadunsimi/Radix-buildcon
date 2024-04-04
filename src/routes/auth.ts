import express from "express";
import { handleVerifyMetaMask } from "../controllers";

const authRoutes = express.Router();

authRoutes.post("/verify-wallet", handleVerifyMetaMask);

export default authRoutes;
