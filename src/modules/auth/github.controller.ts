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
import {
  createSessionUser,
  getPrimaryEmailFromReq,
  getNowTimeString,
  buildNewUser,
} from './utils/github';
import { getAccessToken, getUserData, emailReq } from './services/services';

@Controller('github')
export class GitController {
  constructor(private readonly userServices: UsersService) {}

  @Get(':code')
  async loginGithubUser(
    @Request() req,
    @Session() session: Record<string, any>,
    @Param('code') sessionCode?: string,
  ): Promise<IResponse<any>> {
    const tokenReq = await getAccessToken(sessionCode);
    const accessToken = tokenReq.data.split('=')[1].split('&')[0];

    // Get user data from github via code returned from login
    const userReq = await getUserData(accessToken);
    if (userReq.status !== 200) {
      throw new HttpException(
        { message: 'Failed to get user data from Github.' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const userData = userReq.data;

    // Check for existing user using the returned github ID
    const existingUser = await this.userServices.findOneByGithubId(userData.id);

    // If no user, get email using API and crate new user with GH details.
    if (!existingUser) {
      const emailRequest = await emailReq(accessToken);

      if (emailRequest.status !== 200) {
        throw new HttpException(
          { message: 'Failed to get data user email from Github.' },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const primaryEmail = getPrimaryEmailFromReq(emailRequest);
      const newUser = buildNewUser(userData, primaryEmail, req.ip);
      const savedUser = await this.userServices.save(newUser);

      if (!savedUser)
        throw new HttpException(
          { message: 'Used could not be saved' },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );

      session.user = createSessionUser(newUser);
      return { message: 'Logged in.', data: session.user };
    }

    // If existing user, add sign in data to the user and save, then return.
    existingUser.last_ip = req.ip || req.connection.remoteAddress;
    existingUser.sign_in_count += 1;
    existingUser.last_login = getNowTimeString();

    const updatedUser = await this.userServices.save(existingUser);

    if (!updatedUser)
      throw new HttpException(
        { message: 'Used could not be updated' },
        HttpStatus.NOT_MODIFIED,
      );

    session.user = createSessionUser(existingUser);
    return { message: 'Logged in.', data: session.user };
  }
}
