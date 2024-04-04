import { IExpressRequest } from "../interfaces";
import { Response as ExpressResponse } from "express";
import * as ResponseManager from "../helpers/response.manager";
import * as donationService from "../services/donation.service";

export async function handleCreateDonation(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  try {
    const donation = await donationService.createDonation();
    ResponseManager.handleError(res, { donation });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}
