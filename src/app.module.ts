import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PostsModule } from './posts/posts.module';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [AuthModule, AdminModule, PostsModule, BankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
