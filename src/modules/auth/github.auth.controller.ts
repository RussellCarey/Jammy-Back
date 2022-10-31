import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  Session,
  Request,
  Post,
} from '@nestjs/common';
import { GithubService } from './github.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.services';

@Controller()
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly userService: UsersService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    // Login to github
  }

  @Get('auth/github')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(
    @Session() session: Record<string, any>,
    @Req() req,
  ) {
    const loggedInUser = await this.githubService.githubLogin(req);

    const existingUser = await this.userService.findOneByEmail(
      loggedInUser.email,
    );

    if (!existingUser) {
      await this.userService.save({
        name: loggedInUser.name,
        github_id: loggedInUser.id,
        github_username: loggedInUser.login,
        email: loggedInUser.email,
        image: loggedInUser.image,
      });
    }

    session.user = loggedInUser;
    session.save();

    return { message: 'Loggin in' };
  }

  @Get('auth/check')
  githubCheck(@Session() session: Record<string, any>, @Req() req) {
    console.log('CHECK');
    console.log(session);
    return { message: 'CHECKED SESSION' };
  }

  @UseGuards(UserGuard)
  @Post('logout')
  async logout(@Request() req) {
    req.session.user = null;
    req.session.save();
    req.session.destroy();
    req.logout();
    return HttpStatus.OK;
  }
}
