import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { GithubService } from './github.service';

import { AuthGuard } from '@nestjs/passport';

@Controller()
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    //
  }

  @Get('auth/github')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    return this.githubService.githubLogin(req);
  }
}
