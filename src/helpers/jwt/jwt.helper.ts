import * as jwt from "jsonwebtoken";
import { type Response } from "express";
import { config } from "../../constants/settings";
import { IExpressRequest } from "../../interfaces";
import { UserTokenDb } from "../../models";

export interface JwtConfig {
  privateKey: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleJsonResponse?: Function;
  UserTokenDb: any;
}

interface GenerateTokenParam {
  walletAddress: string;
  userId?: string;
  expiresIn?: number;
}

export class JwtHelper {
  private readonly configOption: JwtConfig;
  handleJsonResponse?: Function;
  UserTokenDb: any;

  constructor(configOption: JwtConfig) {
    this.configOption = configOption;
    this.handleJsonResponse = configOption.handleJsonResponse;
    this.UserTokenDb = configOption.UserTokenDb;
  }

  respondError(res: Response, code: number, message: string) {
    if (this.handleJsonResponse) {
      return this.handleJsonResponse(code, message);
    }
    res.status(403).json({ error: true, message });
  }

  generateToken(body: GenerateTokenParam): string {
    const encryptionKey = Buffer.from(
      this.configOption.privateKey,
      "base64"
    ).toString();

    return jwt.sign(
      {
        userId: body.userId,
        wallet: body.walletAddress,
      },
      encryptionKey,
      { expiresIn: "7d" }
    );
  }

  async verifyToken(token: string): Promise<GenerateTokenParam> {
    try {
      const result = jwt.verify(
        token,
        Buffer.from(this.configOption.privateKey, "base64").toString()
      );
      return result as GenerateTokenParam;
    } catch (error: any) {
      console.error(error);
      throw {
        code: 403,
        data: error,
      };
    }
  }

  requirePermission() {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return async (req: IExpressRequest, res: Response, next: Function) => {
      const token = req.headers["x-auth-token"];

      if (!token) {
        return this.respondError(res, 403, "No API token");
      }

      try {
        if (typeof token !== "string") {
          return this.respondError(
            res,
            403,
            "Auth token is not a valid string"
          );
        }

        const dbToken = await this.UserTokenDb.findOne({ token });
        if (!dbToken) {
          return this.respondError(res, 403, "invalid token");
        }

        const decoded = await this.verifyToken(token);

        req.wallet = decoded.walletAddress;
        req.userId = decoded.userId;

        return next();
      } catch (error: any) {
        return this.respondError(res, 403, error);
      }
    };
  }
}

export const jwtHelper = new JwtHelper({
  privateKey: config.jwtPrivateKey,
  UserTokenDb,
});
