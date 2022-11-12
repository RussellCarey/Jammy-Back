import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UseGuards,
  Body,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { CommentService } from './comments.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CommentDTO } from './coments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AdminGuard)
  @Get('')
  async get(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.commentService.getAll({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved all comments', data: fp };
  }

  @UseGuards(AdminGuard)
  @Get('/:resource')
  async getAll(
    @Param('resource') resource: string,
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.commentService.getAllResource(resource, {
      skip,
      take,
      order,
    });
    return { message: `Retrieved all comments from ${resource}`, data: fp };
  }

  @UseGuards(LoggedInGuard)
  @Get('/user/:resource')
  async getAllForUser(
    @Session() session: Record<string, any>,
    @Param('resource') resource: string,
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const fp = await this.commentService.getAllResourceFromUser(
      resource,
      {
        skip,
        take,
        order,
      },
      session,
    );
    return {
      message: `Retrieved all comments from ${resource} for user.`,
      data: fp,
    };
  }

  @UseGuards(LoggedInGuard)
  @Post('project/:projectid')
  async createProjectComment(
    @Session() session: Record<string, any>,
    @Body() body,
    @Param('projectid', OptionalIntPipe) projectid?: number,
  ) {
    const createdFP = await this.commentService.createProjectComment(
      projectid,
      session,
      body.comment,
    );
    return {
      message: `Added project comment`,
      data: createdFP,
    };
  }

  @UseGuards(LoggedInGuard)
  @Post('jam/:jamid')
  async createJamComment(
    @Session() session: Record<string, any>,
    @Body() body,
    @Param('jamid', OptionalIntPipe) jamid?: number,
  ) {
    const createdFP = await this.commentService.createJamComment(
      jamid,
      session,
      body.comment,
    );
    return {
      message: `Added jam comment`,
      data: createdFP,
    };
  }
}
