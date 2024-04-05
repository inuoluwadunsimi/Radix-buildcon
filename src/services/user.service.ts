import { NotFoundError, User } from "../interfaces";
import { UserDb } from "../models";

export async function getUserProfile(userId: string): Promise<User> {
  const user = await UserDb.findOne<User>({ _id: userId });
  if (!user) {
    throw new NotFoundError("user not found");
  }
  return user;
}
