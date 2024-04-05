import {
  AuthResponse,
  BadRequestError,
  User,
  verifyAddressRequest,
} from "../interfaces";
import Web3 from "web3";
import { UserDb, UserTokenDb } from "../models";
import { jwtHelper } from "../helpers/jwt/jwt.helper";
import { config } from "../constants/settings";

const web3 = new Web3(config.smartContract.providerUrl);
export async function verifyMetMask(
  body: verifyAddressRequest
): Promise<AuthResponse> {
  const { message, signature, address } = body;
  const prefixedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;
  const recoveredAddress = web3.eth.accounts.recover(
    prefixedMessage,
    signature
  );
  console.log(recoveredAddress);

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    throw new BadRequestError("failed to verify signature");
  }

  const userExists = await UserDb.findOne<User>({ walletAddress: address });
  if (userExists) {
    const token = jwtHelper.generateToken({
      userId: userExists.id,
      walletAddress: address,
    });

    await UserTokenDb.updateOne(
      {
        user: userExists.id,
      },
      { token },
      { upsert: true }
    );

    return {
      token,
      user: userExists,
    };
  }

  const user = await UserDb.create({
    walletAddress: address,
  });
  const token = jwtHelper.generateToken({
    userId: user.id,
    walletAddress: address,
  });

  await UserTokenDb.create({
    token,
    user: user.id,
  });

  return {
    token,
    user,
  };
}
