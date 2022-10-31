import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  Session,
  Request,
  Post,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { GithubService } from './github.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.services';

@Controller('auth')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly userService: UsersService,
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    // Login to github
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
    if (!existingUser) {
      existingUser = await this.userService.save({ ...req.user });
    }

    // Get details from new / current user.
    const { id, github_id, email, name, github_username } = existingUser;

    // Add to the session data,
    session.user = {
      id,
      github_id,
      email,
      name,
      github_username,
      // image,
      // accessToken: loggedInUser.accessToken,
    };

    session.save();

    // Redirect to homepage.
    return res.redirect('https://www.github.com');
  }

  @Get('check')
  githubCheck(@Session() session: Record<string, any>, @Req() req) {
    console.log('CHECK');
    console.log(session);
    return { message: 'Checked session  ' };
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
