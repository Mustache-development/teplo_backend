import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { TokenBlacklist } from "./schemas/token-blacklist.schema";
import { Request } from "express";

@Injectable()
export class TokenService {
  private secret: string = "fsdfsdfsdfsdfd";
  private timeToken: number = 100000;

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(TokenBlacklist.name)
    private tokenBlacklistModel: mongoose.Model<TokenBlacklist>
  ) {}

  async generateJwtToken(email: string) {
    const payload = { email };

    return this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: this.timeToken,
    });
  }

  async validateJwtToken(
    token: string
  ): Promise<{ authorization: boolean; data: { email: string } }> {
    if (!token)
      return {
        authorization: false,
        data: null,
      };

    try {
      const checkTokenBlacklist = await this.tokenBlacklistModel.findOne({
        token: token,
      });

      if (checkTokenBlacklist)
        return {
          authorization: false,
          data: null,
        };

      const data = this.jwtService.verify(token, {
        secret: this.secret,
        ignoreExpiration: false,
      });

      if (data && data.exp && data.exp * 1000 > Date.now()) {
        return {
          authorization: true,
          data: data,
        };
      } else {
        await this.tokenBlacklistModel.create({ token: token });
        return {
          authorization: false,
          data: null,
        };
      }
    } catch (err) {
      return {
        authorization: false,
        data: null,
      };
    }
  }

  async removeJwtToken(token: string) {
    await this.tokenBlacklistModel.create({ token: token });
  }

  getBearerToken(request: Request) {
    const authorizationHeader = request.headers["authorization"];

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return null;
    }

    return authorizationHeader.split(" ")[1];
  }
}
