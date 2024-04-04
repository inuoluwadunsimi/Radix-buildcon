import express from "express";
import { handleVerifyMetaMask, handleCreateDonation } from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router();

donationRoutes.post(
  "/create",
  jwtHelper.requirePermission(),
  handleCreateDonation
);

export default donationRoutes;
