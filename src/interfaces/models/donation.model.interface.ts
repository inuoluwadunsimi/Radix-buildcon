import { BaseModel } from "./base.model";

export interface Donation extends BaseModel {
  name: string;
  description: string;
  wallet: string;
  target: number;
  raised: number;
}

export interface Transaction extends BaseModel {
  donorAddress: string;
  transactionHash: string;
  donation: string;
}
