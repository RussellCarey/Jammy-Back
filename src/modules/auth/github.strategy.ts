import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-github2';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
      scope: ['user:email'],
    });
  }
  async validate(
    accessToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, avatar_url, login, id } = profile._json;
    const { emails } = profile;

    const user = {
      id,
      email: emails[0].value,
      name: name,
      login: login,
      picture: avatar_url,
      accessToken,
    };
    done(null, user);
  }
}
