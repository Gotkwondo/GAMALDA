// 정보가 get되는지 확인되면 BE작업을 하자
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_LOGIN_CALLBACK_URL
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    const email = profile._json.email;
    const nickname = profile._json.nickname;
    const profileImage = profile._json.profile_image;

    const user = 'test';
    if (user === null) {
    } else {
      return { 
        email: email,
        nickname: nickname,
        profileImage: profileImage,
        naverRefresh_token: refreshToken,
      }
    }
  }
}