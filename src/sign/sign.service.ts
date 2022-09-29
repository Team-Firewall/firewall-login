import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import db from 'util/database'
import { hash, getRandom } from 'util/text';
@Injectable()
export class SignService {
  async getSignIn(req: Request, res: Response) {
    const { id, password } = req.body;
    const [user] = await db.select('*').from('user').where({ account: id }); //db에 userid값을 user라는 변수에 할당
    if (!user) {
      //user라는 변수가 없을 경우 (유저가 검색되지 않을 경우)
      return res.status(400).send({
        success: false,
        msg: '해당하는 유저가 없습니다.',
      });
    } else {
      if (user.password === hash(password + user.salt)) {
        // 뒤 쪽이 입력받은 값이며, user
        return res.status(200).send({
          success: true,
          msg: '로그인을 성공적으로 완료했습니다.',
          token: sign(
            {
              account: user.account,
              grade: user.position === 2 ? '0' : user.grade,
              class: user.position === 2 ? '0' : user.class,
              number: user.position === 2 ? '0' : user.number,
              name: user.name,
              userid: user.userid,
              position: user.position,
            },
            'SECRET',
            { expiresIn: user.position < 1 ? '30m' : '10m' },
          ),
        });
      } else
        return res.status(400).send({
          success: false,
          msg: '아이디나 비밀번호를 확인해주세요.',
        });
    }
  }

  async getHash(req: Request, res: Response) {
    const { text } = req.body;
    const salt = getRandom('all', 10);
    return res.status(200).send({
      success: true,
      hash: hash(text + salt), //salt까지 더한 값으로 hash값 만듬
      salt,
    });
  }
}

//hash, token, salt

//hash = 암호화라는거고

// token은 데이터를 담은 암호화된 텍스트

// salt는 암호화를 강화해주는 부분 텍스트
