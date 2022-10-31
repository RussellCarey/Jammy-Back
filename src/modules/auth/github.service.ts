import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GithubService {
  async githubLogin(req) {
    if (!req.user) throw new UnauthorizedException('No GitHub account found');
    return req.user;
  }
}
