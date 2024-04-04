import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { config } from "../constants/settings";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../interfaces";

const transactionSchema = new Schema<Transaction>(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
    },
    donorAddress: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
    donation: {
      type: String,
      required: true,
      ref: config.mongodb.collections.donation,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    toObject: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);
export const TransactionDb = mongoose.model(
  config.mongodb.collections.sample,
  transactionSchema
);
