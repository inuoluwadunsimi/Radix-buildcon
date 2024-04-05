import { IExpressRequest } from "../interfaces";
import { Response as ExpressResponse } from "express";
import * as ResponseManager from "../helpers/response.manager";
import * as userService from "../services/user.service";

export async function handleGetUserProfile(
  req: IExpressRequest,
  res: ExpressResponse
): Promise<void> {
  const userId = req.userId;
  try {
    const user = await userService.getUserProfile(userId as string);
    ResponseManager.success(res, { user });
  } catch (err: any) {
    ResponseManager.handleError(res, err);
  }
}
