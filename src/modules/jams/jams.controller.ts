import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { JamServices } from './jams.service';
import { JamDTO } from './jams.dto';
import { JamUpdateDTO } from './jams.update.dto';

@Controller('jams')
export class JamController {
  constructor(private readonly jamServices: JamServices) {}
  @Get('search')
  async searchForJamByName(@Query('term') term?: string): Promise<any> {
    const jam = await this.jamServices.getJamByName(term);
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

  // Create product
  @Post()
  async createJam(@Body() body: JamDTO) {
    const createdJam = await this.jamServices.createJam(body);
    return {
      message: `Created a new jam`,
      data: createdJam,
    };
  }

  // Update a product
  @Patch(':jamId')
  async updateProduct(
    @Body() body: JamUpdateDTO,
    @Param('jamId', ParseIntPipe) jamId: number,
  ) {
    const updatedProduct = await this.jamServices.updateJam(jamId, body);
    return { message: `Updated a jam`, data: updatedProduct, status: true };
  }
}
