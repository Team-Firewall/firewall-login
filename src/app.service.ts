import { Injectable } from '@nestjs/common';
import db from 'util/database';
import { Request, Response } from 'express';
@Injectable()
export class AppService {
  async getAlldb(table:string, req: Request, res: Response) {
    const isTable = await db.select('*').from({table})
    console.log(isTable);
    if( !isTable ) {
      return res.status(400).send({
        success: false,
        msg: '해당하는 table이 없습니다.'
      });
    } else {
      return res.status(200).send({
        success: true,
        msg: '해당하는 table의 값을 성공적으로 조회했습니다.',
        isTable,
      });
    }
  }
}