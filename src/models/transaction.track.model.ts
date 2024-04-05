import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { config } from "../constants/settings";
import { v4 as uuidv4 } from "uuid";
import { Track } from "../interfaces";

const trackSchema = new Schema<Track>(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
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
export const TrackDb = mongoose.model(
  config.mongodb.collections.tracks,
  trackSchema
);
