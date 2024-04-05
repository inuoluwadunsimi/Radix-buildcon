import { Transaction } from "..";

export interface DonorsList {
  donors: Transaction[];
  noOfDonations: number;
}
