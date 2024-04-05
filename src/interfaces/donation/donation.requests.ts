export interface CreateDonationRequest {
  name: string;
  description: string;
  target: number;
  raised: number;
}

export interface CreateDonation {
  walletAddress: string;
  body: CreateDonationRequest;
}

export interface TrackRequest {
  orderId: string;
  transactionHash: string;
}
