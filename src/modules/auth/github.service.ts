import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GithubService {
  async githubLogin(req) {
    if (!req.user) {
      return 'No user from Github';
    }

    // Save user to the DB

    return {
      message: 'User Info from Github',
      user: req.user,
    };
  }
}
