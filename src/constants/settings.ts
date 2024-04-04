// This is where i set config for mongodb etc

import * as dotenv from "dotenv";

export const config = {
  jwtPrivateKey: <string>process.env.JWT_PRIVATE_KEY,
  mongodb: {
    uri: <string>process.env.MONGODB_URI,
    collections: {
      sample: "sample-collection",
      user: "users",
      user_tokens: "user_tokens",
      donation: "donations",
      transaction: "transactions",
    },
  },

  redis: {
    uri: <string>process.env.REDIS_URI,
  },
};
