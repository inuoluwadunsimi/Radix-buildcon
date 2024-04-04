import {
  AuthResponse,
  BadRequestError,
  verifyAddressRequest,
} from "../interfaces";
import Web3 from "web3";
import { UserDb, UserTokenDb } from "../models";
import { jwtHelper } from "../helpers/jwt/jwt.helper";

const web3 = new Web3();
export async function verifyMetMask(
  body: verifyAddressRequest
): Promise<AuthResponse> {
  const { message, signature, address } = body;
  const prefixedMessage = `\x19Ethereum Signed Message:\n${message.length}${message}`;
  const messageHash = web3.utils.sha3(prefixedMessage);
  if (!messageHash) {
    throw new BadRequestError("invalid message");
  }
  const recoveredAddress = web3.eth.accounts.recover(messageHash, signature);

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    throw new BadRequestError("failed to verify signature");
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
