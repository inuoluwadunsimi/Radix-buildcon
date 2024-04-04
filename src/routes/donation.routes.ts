import express from "express";
import {
  handleCreateDonation,
  handleDonorsList,
  handleGetAllDonations,
  handleGetSingleDonation,
  handleGetUserDonations,
} from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router();

donationRoutes.post(
  "/create",
  jwtHelper.requirePermission(),
  handleCreateDonation
);

donationRoutes.get("/", handleGetAllDonations);

donationRoutes.get("/donation/:donationId", handleGetSingleDonation);

donationRoutes.get(
  "/me",
  jwtHelper.requirePermission(),
  handleGetUserDonations
);

donationRoutes.get("/donors/:donationId", handleDonorsList);

export default donationRoutes;
