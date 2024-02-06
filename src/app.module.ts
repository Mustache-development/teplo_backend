import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { PostsModule } from "./posts/posts.module";
import { BankModule } from "./bank/bank.module";
import { TokenModule } from "./token/token.module";
import { BankWebHookModule } from "./bank-whook/bank-whook.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://test_education:Fm5xGy5NlfsDXhu0@cluster0.svrxsep.mongodb.net/teplo"
    ),
    AuthModule,
    AdminModule,
    PostsModule,
    BankModule,
    TokenModule,
    BankWebHookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
