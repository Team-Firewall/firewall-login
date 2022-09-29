import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response} from 'express';
import { AppService } from './app.service';

@Controller('table')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:table')
  async getAll(@Param('table') table: string ,@Req() req: Request, @Res() res: Response) {
    return this.appService.getAlldb(table, req, res);
  }
}