import { Request } from "express";
import { Response as ExpressResponse } from "express";
import * as ResponseManager from "../helpers/response.manager";
import { verifyAddressRequest } from "../interfaces";
import * as authService from "../services/auth.service";

export async function handleVerifyMetaMask(req: Request, res: ExpressResponse) {
  const body: verifyAddressRequest = req.body;
  try {
    const token = await authService.verifyMetMask(body);
    ResponseManager.success(res, { token });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleCreateDonation(
  req: Request,
  res: ExpressResponse
) {}
