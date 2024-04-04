import express from "express";
import { handleVerifyMetaMask } from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router();

donationRoutes.post("/create", jwtHelper.requirePermission());

export default donationRoutes;
