import express from "express";
import {
  handleCreateDonation,
  handleDonorsList,
  handleGetAllDonations,
  handleGetSingleDonation,
  handleGetUserDonations,
  handleTrack,
} from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router({ mergeParams: true });

donationRoutes.post(
  "/create",
  jwtHelper.requirePermission(),
  handleCreateDonation
);

donationRoutes.get("/", handleGetAllDonations);

donationRoutes.get("/:donationId", handleGetSingleDonation);

donationRoutes.get(
  "/me",
  jwtHelper.requirePermission(),
  handleGetUserDonations
);

donationRoutes.get("/donors/:donationId", handleDonorsList);
donationRoutes.post("/track", handleTrack);

export default donationRoutes;
