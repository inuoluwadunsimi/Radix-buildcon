import { CreateDonation, Donation } from "../interfaces";
import { DonationDb } from "../models/donation.models";

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
