import Web3 from "web3";
import { config } from "../constants/settings";
import { DonationDb, TrackDb, TransactionDb } from "../models";
import { Track } from "../interfaces";

const web3 = new Web3(config.smartContract.providerUrl);
const contractABI = [
  {
    inputs: [],
    name: "fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "transactionHash",
        type: "bytes32",
      },
    ],
    name: "TransactionCompleted",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToAmountFunded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "funders",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVersion",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINIMUM_USD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contract = new web3.eth.Contract(
  contractABI,
  config.smartContract.contractAddress
);

export const listenForPaymentEvents = async () => {
  contract.events
    .TransactionCompleted({ fromBlock: "latest" })
    .on("data", async function (event) {
      const { transactionHash, address } = event;
      const { sender, amount } = event.returnValues;
      const trackDonation = await TrackDb.findOne<Track>({ transactionHash });
      if (!trackDonation) {
        console.log("transaction does not exits");
        throw new Error("transaction does not exist");
      }

      await DonationDb.updateOne(
        { _id: trackDonation.donation },
        {
          $inc: { raised: amount },
        }
      );

      await TransactionDb.create({
        donorAddress: sender,
        transactionHash,
        donation: trackDonation.donation,
        amount,
      });
    });
};
