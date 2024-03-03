import { Injectable } from "@nestjs/common";
import { TokenService } from "src/token/token.service";
import { Auth } from "src/auth/schemas/auth.schema";
import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "express";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { IdTelegram } from "./schemas/id-telegram.schema";
import { TokenMonobank } from "./schemas/token-monobank.schema";
import { TokenTelegramBot } from "./schemas/token-telegram-bot.schema";
const bcrypt = require("bcryptjs");
import { HttpService } from "@nestjs/axios";
import { catchError, lastValueFrom } from "rxjs";

@Injectable()
export class AdminService {
  constructor(
    private readonly tokenService: TokenService,
    @InjectModel(Auth.name)
    private authModel: mongoose.Model<Auth>,
    @InjectModel(IdTelegram.name)
    private idTelegramModel: mongoose.Model<IdTelegram>,
    @InjectModel(TokenTelegramBot.name)
    private tokenTelegramBotModel: mongoose.Model<TokenTelegramBot>,
    @InjectModel(TokenMonobank.name)
    private tokenMonobankModel: mongoose.Model<TokenMonobank>,
    private readonly httpService: HttpService
  ) {}

  async updateEmail(req: Request, newEmail: string) {
    const token = this.tokenService.getBearerToken(req);

    if (!newEmail || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const checkAdmin = await this.authModel.findOne({
        email: tokenData.data.email,
      });

      if (!checkAdmin) {
        return {
          code: 404,
          message: "not found",
        };
      }

      await this.authModel.findOneAndUpdate(
        { _id: checkAdmin._id },
        { email: newEmail }
      );

      return {
        code: 200,
        message: "email update",
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async updatePassword(req: Request, data: UpdatePasswordDto) {
    const token = this.tokenService.getBearerToken(req);

    if (!data.newPassword || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const checkAdmin = await this.authModel.findOne({
        email: tokenData.data.email,
      });

      if (!checkAdmin) {
        return {
          code: 404,
          message: "not found",
        };
      }

      if (bcrypt.compareSync(data.currentPassword, checkAdmin.password)) {
        await this.authModel.findOneAndUpdate(
          { _id: checkAdmin._id },
          { password: bcrypt.hashSync(data.newPassword) }
        );
        return {
          code: 200,
          message: "password update",
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

  async updateIdTelegram(req: Request, newIdTelegram: string) {
    const token = this.tokenService.getBearerToken(req);

    if (!newIdTelegram || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const checkIdTelegram = await this.idTelegramModel.find();

      if (checkIdTelegram.length > 0) {
        await this.idTelegramModel.findOneAndUpdate(
          { _id: checkIdTelegram[0]._id },
          { telegram: newIdTelegram }
        );
      } else {
        await this.idTelegramModel.create({ telegram: newIdTelegram });
      }

      return {
        code: 200,
        message: "id telegram update",
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async updateTokenTelegramBot(req: Request, newTokenTelegramBot: string) {
    const token = this.tokenService.getBearerToken(req);

    if (!newTokenTelegramBot || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const checkTokenTelegramBot = await this.tokenTelegramBotModel.find();

      if (checkTokenTelegramBot.length > 0) {
        await this.tokenTelegramBotModel.findOneAndUpdate(
          { _id: checkTokenTelegramBot[0]._id },
          { token: newTokenTelegramBot }
        );
      } else {
        await this.tokenTelegramBotModel.create({ token: newTokenTelegramBot });
      }

      return {
        code: 200,
        message: "token telegram update",
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async updateTokenMonobank(req, newTokenMonobank: string) {
    const token = this.tokenService.getBearerToken(req);

    if (!newTokenMonobank || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const { data } = await lastValueFrom(
        this.httpService
          .get<any>("https://api.monobank.ua/personal/client-info", {
            headers: { "X-Token": newTokenMonobank },
          })
          .pipe(
            catchError((error) => {
              throw error;
            })
          )
      );

      let jars = [];
      if (data.jars) {
        jars = data.jars.map(function (jar: { id: string; title: string }) {
          return {
            id: jar.id,
            title: jar.title,
          };
        });
      }

      console.log(jars);

      const checkMonobank = await this.tokenMonobankModel.find();

      if (checkMonobank.length > 0) {
        await this.tokenMonobankModel.findOneAndUpdate(
          { _id: checkMonobank[0]._id },
          {
            token: newTokenMonobank,
            jars: jars,
          }
        );
      } else {
        await this.tokenMonobankModel.create({
          token: newTokenMonobank,
          jars: jars,
        });
      }

      console.log(await this.tokenMonobankModel.find());

      return {
        code: 200,
        message: "Token monobank update. Check jar, please.",
        jars,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }

  async updateActiveJar(req, newActiveJar: string) {
    const token = this.tokenService.getBearerToken(req);

    if (!newActiveJar || !token) {
      return {
        status: 400,
        message: "Not enough arguments",
      };
    }

    try {
      const tokenData = await this.tokenService.validateJwtToken(token);
      if (!tokenData.authorization) {
        return {
          code: 401,
          message: "authorization fail",
        };
      }

      const checkMonobank = await this.tokenMonobankModel.find();
      const idArr = checkMonobank[0].jars.map(function (jar: {
        id: string;
        title: string;
      }) {
        return jar.id;
      });
      if (checkMonobank.length === 0 && !idArr.includes(newActiveJar)) {
        throw "Invalid Monobank token or jar";
      }

      await this.tokenMonobankModel.findOneAndUpdate(
        { _id: checkMonobank[0]._id },
        { activeJar: newActiveJar }
      );

      return {
        code: 200,
        message: "Active jar monobank update",
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: "error server",
      };
    }
  }
}
