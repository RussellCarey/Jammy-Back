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
import { ProjectServices } from '../projects/projects.service';
import { CommentService } from '../comments/comments.service';

@Controller('favourites')
export class FavouriteController {
  constructor(
    private readonly fpServices: FavouriteServices,
    private readonly projectServices: ProjectServices,
    private readonly commentServices: CommentService,
  ) {}

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
    return { message: 'Retrieved favourited items', data: fp };
  }

  // Get all of users favourites for project or coments.
  @UseGuards(LoggedInGuard)
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
    // Check project we are trying to add to exists
    const project = await this.projectServices.getProjectById(projectid);

    if (!project)
      return { message: `Project with this ID does not exist`, data: null };

    // Check for existing favourite
    const exisiting = await this.fpServices.getOneProjectFavourite({
      projectid,
      userid: session.user.id,
    });

    if (exisiting) return { message: `Already favourited`, data: null };

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
    // Check the comment we are trying to add to exists.
    const comment = await this.commentServices.getOneComment(
      session,
      commentid,
    );

    if (!comment)
      return { message: `Comment with this ID does not exist`, data: null };

    // Check for existing favourite
    const exisiting = await this.fpServices.getOneCommentFavourite({
      commentid,
      userid: session.user.id,
    });

    if (exisiting) return { message: `Already favourited`, data: null };

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
