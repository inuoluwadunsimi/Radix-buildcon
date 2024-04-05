import {
  BadRequestError,
  CreateDonation,
  Donation,
  NotFoundError,
  TrackRequest,
  Transaction,
} from "../interfaces";
import { DonationDb, DonationStatus } from "../models";
import { TransactionDb } from "../models";
import { TrackDb } from "../models";

export async function createDonation(body: CreateDonation): Promise<Donation> {
  const { name, description, target } = body.body;

  const donation = await DonationDb.create({
    name,
    description,
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

export async function updateDonation(
  status: DonationStatus,
  donationId: string
): Promise<Donation> {
  const donation = await DonationDb.findOneAndUpdate<Donation>(
    { _id: donationId },
    { status },
    { new: true }
  );
  if (!donation) {
    throw new NotFoundError("error not found");
  }
  return donation;
}
