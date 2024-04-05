import {
  BadRequestError,
  CreateDonation,
  Donation,
  NotFoundError,
  TrackRequest,
  Transaction,
} from "../interfaces";
import { DonationDb } from "../models";
import { TransactionDb } from "../models";
import { TrackDb } from "../models";

export async function createDonation(body: CreateDonation): Promise<Donation> {
  const { name, description, raised, target } = body.body;

  const donation = await DonationDb.create({
    name,
    description,
    raised,
    target,
    wallet: body.walletAddress,
  });

  return donation;
}

export async function getAllDonations(): Promise<Donation[]> {
  return await DonationDb.find({});
}

export async function getAllUserDonations(wallet: string): Promise<Donation[]> {
  return await DonationDb.find({ wallet });
}

export async function getSingleDonation(donationId: string): Promise<Donation> {
  const donation = await DonationDb.findOne<Donation>({ _id: donationId });
  if (!donation) {
    throw new NotFoundError("donation not found");
  }
  return donation;
}

export async function getDonors(donationId: string): Promise<Transaction[]> {
  return await TransactionDb.find({ donation: donationId });
}

export async function trackTransaction(body: TrackRequest): Promise<void> {
  await TrackDb.create(body);
}
