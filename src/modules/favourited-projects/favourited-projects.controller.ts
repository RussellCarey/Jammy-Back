import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { FavouritedProjectServices } from './favourited-projects.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('favourited_projects')
export class FavouritedProjectController {
  constructor(private readonly fpServices: FavouritedProjectServices) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAll(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.fpServices.getAll({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved favourited projects', data: fp };
  }

  @Get('user')
  async getUsers(
    @Session() session: Record<string, any>,
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.fpServices.getAllFromUser(
      {
        skip,
        take,
        order,
      },
      session,
    );
    return { message: 'Retrieved your favourited projects', data: fp };
  }

  @Get('find')
  async getOne(
    @Query('userid', OptionalIntPipe) userid?: number,
    @Query('projectid', OptionalIntPipe) projectid?: number,
  ): Promise<any> {
    const products = await this.fpServices.getOne({
      userid,
      projectid,
    });
    return { message: 'Retrieved jams', data: products };
  }

  @UseGuards(LoggedInGuard)
  @Post(':projectid')
  async create(
    @Session() session: Record<string, any>,
    @Param('projectid', OptionalIntPipe) projectid?: number,
  ) {
    // Check for existing favourite
    const exisiting = await this.fpServices.getOne({
      projectid,
      userid: session.user.id,
    });

    if (exisiting) {
      return {
        message: `Already favourited`,
        data: null,
      };
    }

    const createdFP = await this.fpServices.create(projectid, session);
    return {
      message: `Created a relation for projects and favourites`,
      data: createdFP,
    };
  }
}
