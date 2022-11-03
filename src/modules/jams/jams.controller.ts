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
import { JamServices } from './jams.service';
import { JamDTO } from './jams.dto';
import { JamUpdateDTO } from './jams.update.dto';

@Controller('jams')
export class JamController {
  constructor(private readonly jamServices: JamServices) {}

  @Get('search')
  async searchForJamByName(@Query('name') name?: string): Promise<any> {
    const jam = await this.jamServices.getJamByName(name);
    return { message: 'Retrieved jams', data: jam };
  }

  @Get(':jamId')
  async getJam(@Param('jamId', ParseIntPipe) jamId: number): Promise<any> {
    const jam = await this.jamServices.getJamById(jamId);
    return { message: 'Retrieved jams', data: jam };
  }

  @Get()
  async getAllJams(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('order', OrderByPipe) order?: Record<string, 'asc' | 'desc'>,
  ): Promise<any> {
    const products = await this.jamServices.getAllJams({
      skip,
      take,
      order,
    });
    return { message: 'Retrieved jams', data: products };
  }

  @UseGuards(LoggedInGuard)
  @Post()
  async createJam(@Body() body: JamDTO) {
    const createdJam = await this.jamServices.create(body);
    return {
      message: `Created a new jam`,
      data: createdJam,
    };
  }

  @UseGuards(LoggedInGuard)
  @Patch(':jamId')
  async updateJam(
    @Body() body: JamUpdateDTO,
    @Param('jamId', ParseIntPipe) jamId: number,
  ) {
    const updatedJam = await this.jamServices.update(jamId, body);
    return { message: `Updated a jam`, data: updatedJam, status: true };
  }
}
