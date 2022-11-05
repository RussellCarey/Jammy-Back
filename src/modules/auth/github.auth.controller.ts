import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  Session,
  Request,
  UnauthorizedException,
  Res,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
// import { GithubService } from './github.service';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.services';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';

@Controller('auth')
export class GithubController {
  constructor(
    // private readonly githubService: GithubService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('login')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    /**/
  }

  @UseGuards(LoggedInGuard)
  @Get('logout')
  async logout(@Session() session: Record<string, any>, @Request() req) {
    session.user = null;
    session.save();
    session.destroy();
    return HttpStatus.OK;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(
    @Session() session: Record<string, any>,
    @Req() req,
    @Res() res,
  ) {
    // Check for login success.
    if (!req.user) throw new UnauthorizedException('No GitHub account found');

    // Check if we have existing user
    let existingUser = await this.userService.findOneByEmail(req.user.email);

    // Save new user
    if (!existingUser)
      existingUser = await this.userService.save({ ...req.user });

    // Get details from new / current user.
    const { id, github_id, email, name, github_username } = existingUser;

    // Add to the session data,
    session.user = {
      id,
      github_id,
      email,
      name,
      github_username,
      accessToken: req.user.accessToken,
      // image
    };

    session.save();

    // Redirect to homepage (when made)
    return res.redirect('localhost:9432');
  }
}
