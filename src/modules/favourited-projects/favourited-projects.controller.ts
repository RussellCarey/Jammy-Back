import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LoggedInGuard } from 'src/common/guards/logged-in.guard';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { FavouritedProjectServices } from './favourited-projects.service';
import { FavouritedProjectDTO } from './favourited-projects.dto';

@Controller('favourited_projects')
export class FavouritedProjectController {
  constructor(private readonly fpServices: FavouritedProjectServices) {}

  @Get('')
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

  @Get('/find')
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
  @Post()
  async create(@Body() body: FavouritedProjectDTO) {
    const createdFP = await this.fpServices.create(body);
    return {
      message: `Created a relation for projects and favourites`,
      data: createdFP,
    };
  }
}
