import { Controller, Post, Req, Res } from '@nestjs/common';
import { SignService } from './sign.service';
import { Request, Response } from 'express';
@Controller('sign') // /sign
export class SignController {
  constructor(private readonly appService: SignService) {}

  @Post('in') // /sign/in
  signIn(@Req() req: Request, @Res() res: Response) {
    return this.appService.getSignIn(req, res);
  }

  @Post('hash') // /sign/hash
  hash(@Req() req: Request, @Res() res: Response) {
    return this.appService.getHash(req, res);
  }
}
