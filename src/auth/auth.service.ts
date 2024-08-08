import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { TokenService } from "src/token/token.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Auth } from "./schemas/auth.schema";
import { Request } from "express";
import { Forgot } from "./schemas/forgot.schema";
import generateRandomCode from "src/methods/generateRandomCode";
import { ForgotDto } from "./dto/forgot.dto";
const bcrypt = require("bcryptjs");

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<Auth>,
    @InjectModel(Forgot.name)
    private forgotModel: mongoose.Model<Auth>
  ) { }

  async create(data: CreateAuthDto) {
    if (!data.email || !data.password) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const checkAdmin = await this.authModel.find();

      if (checkAdmin.length > 0) {
        return {
          code: 409,
          message: "This user already exists",
        };
      }

      await this.authModel.create({
        email: data.email,
        password: bcrypt.hashSync(data.password),
      });

      return {
        code: 201,
        message: "admin create",
      };
    } catch (err) {
      console.log(err);

      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async login(data: LoginAuthDto) {
    if (!data.email || !data.password) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const checkAdmin = await this.authModel.findOne({ email: data.email });
      if (!checkAdmin) {
        return {
          code: 404,
          message: "not found",
        };
      }
      if (bcrypt.compareSync(data.password, checkAdmin.password)) {
        const token = await this.tokenService.generateJwtToken(data.email);

        return {
          code: 200,
          token,
        };
      } else {
        return {
          code: 401,
          message: "password is not correct",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async verify(request: Request) {
    const token = this.tokenService.getBearerToken(request);

    if (!token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const checkToken = await this.tokenService.validateJwtToken(token);

      if (checkToken.authorization) {
        return {
          code: 200,
          message: "authorization success",
        };
      } else {
        return {
          code: 401,
          message: "authorization fail",
        };
      }
    } catch (err) {
      console.log(err);

      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async logout(request: Request) {
    const token = this.tokenService.getBearerToken(request);

    if (!token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      await this.tokenService.removeJwtToken(token);

      return {
        code: 200,
        message: "logout success",
      };
    } catch (err) {
      console.log(err);

      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async forgotPassword(email: string) {
    if (!email) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const checkAdmin = await this.authModel.findOne({ email: email });
      const checkCode = await this.forgotModel.findOne({ email: email });

      if (!checkAdmin) {
        return {
          code: 404,
          message: "not found",
        };
      }

      if (checkCode) {
        await this.forgotModel.findOneAndUpdate(
          { _id: checkCode._id },
          { code: generateRandomCode() }
        );
      } else {
        await this.forgotModel.create({
          email: email,
          code: generateRandomCode(),
        });
      }
      return {
        code: 200,
        message: "ok",
      };
    } catch (err) {
      console.log(err);

      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async resetPassword(data: ForgotDto) {
    if (!data.email || !data.code || !data.newPassword) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const checkCode = await this.authModel.findOne({
        email: data.email,
        code: data.code,
      });
      if (!checkCode) {
        return {
          code: 404,
          message: "not found",
        };
      }

      await this.authModel.findOneAndUpdate(
        { email: data.email },
        { password: bcrypt.hashSync(data.newPassword) }
      );

      return {
        code: 200,
        message: "password update",
      };
    } catch (err) {
      console.log(err);

      return {
        code: 500,
        message: "error message",
      };
    }
  }
}
