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
import { FavouriteServices } from './favourite.service';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('favourites')
export class FavouriteController {
  constructor(private readonly fpServices: FavouriteServices) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllProject(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.fpServices.getAllResource('project', {
      skip,
      take,
      order,
    });
    return { message: 'Retrieved favourited projects', data: fp };
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllComment(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.fpServices.getAllResource('comment', {
      skip,
      take,
      order,
    });
    return { message: 'Retrieved favourited comments', data: fp };
  }

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsersResource(
    @Session() session: Record<string, any>,
    @Query('resource') resource?: string,
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.fpServices.getAllResourceFromUser(resource, session, {
      skip,
      take,
      order,
    });
    return { message: 'Retrieved favourited projects', data: fp };
  }

  @UseGuards(LoggedInGuard)
  @Post('project/:projectid')
  async createProjectFavourite(
    @Session() session: Record<string, any>,
    @Param('projectid', OptionalIntPipe) projectid?: number,
  ) {
    // Check for existing favourite
    const exisiting = await this.fpServices.getOneProjectFavourite({
      projectid,
      userid: session.user.id,
    });

    if (exisiting) {
      return {
        message: `Already favourited`,
        data: null,
      };
    }

    const createdFP = await this.fpServices.createProjectFavourite(
      projectid,
      session,
    );
    return {
      message: `Created a relation for projects and favourites`,
      data: createdFP,
    };
  }

  @UseGuards(LoggedInGuard)
  @Post('comment/:commentid')
  async createCommentFavourite(
    @Session() session: Record<string, any>,
    @Param('commentid', OptionalIntPipe) commentid?: number,
  ) {
    // Check for existing favourite
    const exisiting = await this.fpServices.getOneCommentFavourite({
      commentid,
      userid: session.user.id,
    });

    if (exisiting) {
      return {
        message: `Already favourited`,
        data: null,
      };
    }

    const createdFP = await this.fpServices.createProjectFavourite(
      commentid,
      session,
    );
    return {
      message: `Created a relation for projects and favourites`,
      data: createdFP,
    };
  }
}
