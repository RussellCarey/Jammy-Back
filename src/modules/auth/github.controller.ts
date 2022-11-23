import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Request,
  Session,
} from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/response.interface';
import { UsersService } from '../users/users.services';
import { Octokit } from 'octokit';
import { User } from '../users/users.entity';
import {
  createSessionUser,
  getPrimaryEmail,
  getAccessToken,
} from './utils/github';

@Controller('github')
export class GitController {
  constructor(private readonly userServices: UsersService) {}

  @Get(':code')
  async searchForProjectByName(
    @Request() req,
    @Session() session: Record<string, any>,
    @Param('code') sessionCode?: string,
  ): Promise<IResponse<any>> {
    const tokenReq = await getAccessToken(sessionCode);
    const accessToken = tokenReq.data.split('=')[1].split('&')[0];

    const octokit = new Octokit({
      auth: accessToken,
    });

    const userReq = await octokit.request('GET /user', {});
    const userData = userReq.data;
    const primaryEmail = await getPrimaryEmail(octokit);
    const existingUser = await this.userServices.findOneByEmail(primaryEmail);

    if (!existingUser) {
      const newUser = new User();
      newUser.name = userData.name;
      newUser.github_id = userData.id.toString();
      newUser.github_username = userData.login;
      newUser.email = primaryEmail;
      newUser.image = userData.avatar_url;
      newUser.location = userData.location;
      newUser.last_ip = req.ip || req.connection.remoteAddress;
      const savedUser = await this.userServices.save(newUser);

      if (!savedUser)
        throw new HttpException(
          { message: 'Used could not be saved' },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      session.user = createSessionUser(newUser);
    } else {
      existingUser.last_ip = req.ip || req.connection.remoteAddress;
      const updatedUser = await this.userServices.save(existingUser);

      if (!updatedUser)
        throw new HttpException(
          { message: 'Used could not be updated' },
          HttpStatus.NOT_MODIFIED,
        );

      session.user = createSessionUser(existingUser);
    }

    return { message: 'Logged in.', data: session.user };
  }
}
