import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { config } from "../constants/settings";
import { v4 as uuidv4 } from "uuid";
import { UserToken } from "../interfaces";

const userToken = new Schema<UserToken>(
  {
    _id: {
      type: String,
      default: function genUUID() {
        return uuidv4();
      },
    },

    token: { type: String, required: true },
    user: {
      type: String,
      required: true,
      ref: config.mongodb.collections.user,
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

export const UserTokenDb = mongoose.model(
  config.mongodb.collections.user_tokens,
  userToken
);
