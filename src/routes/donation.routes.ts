import express from "express";
import { handleCreateDonation, handleGetAllDonations } from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router();

donationRoutes.post(
  "/create",
  jwtHelper.requirePermission(),
  handleCreateDonation
);

donationRoutes.get("/", handleGetAllDonations);

donationRoutes.get("/donation/:donationId");

donationRoutes.get("/me");

export default donationRoutes;
