import { CreateDonationRequest, IExpressRequest } from "../interfaces";
import { Response as ExpressResponse } from "express";
import * as ResponseManager from "../helpers/response.manager";
import * as donationService from "../services/donation.service";

export async function handleCreateDonation(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const body: CreateDonationRequest = req.body;
  const walletAddress = req.wallet;
  try {
    const donation = await donationService.createDonation({
      body,
      walletAddress: <string>walletAddress,
    });
    ResponseManager.handleError(res, { donation });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleGetAllDonations(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  try {
    const donations = await donationService.getAllDonations();
    ResponseManager.success(res, { donations });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}
