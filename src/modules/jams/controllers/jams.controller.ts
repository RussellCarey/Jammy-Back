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
import { JamServices } from '../services/jams.service';
import { JamDTO } from '../dtos/jams.dto';
import { JamUpdateDTO } from '../dtos/jams.update.dto';

@Controller('jams')
export class JamController {
  constructor(private readonly jamServices: JamServices) {}
  // Ordering matters.
  // Get single product from searching name
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
    @Query('order', OrderByPipe) order?: Record<string, 'ASC' | 'DESC'>,
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
    console.log(body);
    const createdJam = await this.jamServices.createJam(body);
    return {
      message: `Created a new jam`,
      data: createdJam,
    };
  }

  // Update a product
  @Patch(':jamId')
  async updateProduct(
    @Body() body: JamDTO,
    @Param('jamId', ParseIntPipe) jamId: number,
  ) {
    console.log(body);
    const updatedProduct = await this.jamServices.updateJam(jamId, body);
    return { message: `Updated a jam`, data: updatedProduct, status: true };
  }
}
