import { BaseModel } from "./base.model";
import { DonationStatus } from "../../models/donation.models";

export interface Donation extends BaseModel {
  name: string;
  description: string;
  wallet: string;
  target: number;
  raised: number;
  status: DonationStatus;
}

export interface Transaction extends BaseModel {
  donorAddress: string;
  transactionHash: string;
  donation: string;
  amount: number;
}
