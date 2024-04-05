import express from "express";
import {
  handleCreateDonation,
  handleDonorsList,
  handleGetAllDonations,
  handleGetSingleDonation,
  handleGetUserDonations,
  handleTrack,
  handleUpdateDonation,
} from "../controllers";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const donationRoutes = express.Router({ mergeParams: true });

donationRoutes.post(
  "/create",
  jwtHelper.requirePermission(),
  handleCreateDonation
);

donationRoutes.get("/", handleGetAllDonations);
donationRoutes.get(
  "/me",
  jwtHelper.requirePermission(),
  handleGetUserDonations
);
donationRoutes.get("/:donationId", handleGetSingleDonation);

donationRoutes.get("/donors/:donationId", handleDonorsList);
donationRoutes.post("/track", handleTrack);
donationRoutes.put(
  "/update/:donationId",
  jwtHelper.requirePermission(),
  handleUpdateDonation
);

export default donationRoutes;
