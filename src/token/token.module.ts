import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import {
  TokenBlacklist,
  TokenBlacklistSchema,
} from "./schemas/token-blacklist.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenBlacklist.name, schema: TokenBlacklistSchema },
    ]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
