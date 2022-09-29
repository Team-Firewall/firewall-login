import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignController } from './sign/sign.controller';
import { SignService } from './sign/sign.service';

@Module({
  controllers: [AppController, SignController],
  providers: [AppService, SignService],
})
export class AppModule {}
