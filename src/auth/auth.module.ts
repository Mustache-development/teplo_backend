import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TokenModule } from "src/token/token.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Auth, AuthSchema } from "./schemas/auth.schema";
import { Forgot, ForgotSchema } from "./schemas/forgot.schema";

@Module({
  imports: [
    TokenModule,
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Forgot.name, schema: ForgotSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
