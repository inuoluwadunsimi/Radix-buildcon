import express from "express";
import { routeError } from "../handlers";
import authRoutes from "../routes/auth";
import donationRoutes from "./donation.routes";

import { MainApiValidator } from "../middlewares/openapi.validator";
import userRoutes from "./user.routes";

const router: express.Router = express.Router();

router.use("/", MainApiValidator);
router.use("/auth", authRoutes);
router.use("/donations", donationRoutes);
router.use("/user", userRoutes);

router.use("/health", (req, res) => {
  res.send({ status: "OK" });
});

router.use(routeError);

export default router;
