import { BaseModel } from "./base.model";

export interface User extends BaseModel {
  walletAddress: string;
}

export interface UserToken extends BaseModel {
  token: string;
  user: string;
}
