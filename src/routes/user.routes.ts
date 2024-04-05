import express from "express";
import { jwtHelper } from "../helpers/jwt/jwt.helper";
import { handleGetUserProfile } from "../controllers";

const userRoutes = express.Router();

userRoutes.get("/me", jwtHelper.requirePermission(), handleGetUserProfile);

export default userRoutes;
