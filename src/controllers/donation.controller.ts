import {
  CreateDonationRequest,
  IExpressRequest,
  TrackRequest,
} from "../interfaces";
import { Response as ExpressResponse } from "express";
import * as ResponseManager from "../helpers/response.manager";
import * as donationService from "../services/donation.service";

export async function handleCreateDonation(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const body: CreateDonationRequest = req.body;
  const walletAddress = req.wallet!;
  try {
    const donation = await donationService.createDonation({
      body,
      walletAddress: <string>walletAddress,
    });
    ResponseManager.success(res, { donation });
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

export async function handleGetUserDonations(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const wallet = req.wallet;
  try {
    const donations = await donationService.getAllUserDonations(
      wallet as string
    );
    ResponseManager.success(res, { donations });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleGetSingleDonation(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const { donationId } = req.params;

  try {
    const donation = await donationService.getSingleDonation(donationId);
    ResponseManager.success(res, { donation });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleDonorsList(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const { donationId } = req.params;
  try {
    const donors = await donationService.getDonors(donationId);
    ResponseManager.success(res, { donors });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleTrack(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const body: TrackRequest = req.body;

  try {
    await donationService.trackTransaction(body);
    ResponseManager.success(res, { message: "success" });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}

export async function handleUpdateDonation(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const { status } = req.body;
  const { donationId } = req.params;

  const donation = await donationService.updateDonation(status, donationId);
  ResponseManager.success(res, { donation });

  try {
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}
