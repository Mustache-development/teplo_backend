import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import {
  TokenBlacklist,
  TokenBlacklistSchema,
} from "./schemas/token-blacklist.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenBlacklist.name, schema: TokenBlacklistSchema },
    ]),
  ],
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class TokenModule {}
