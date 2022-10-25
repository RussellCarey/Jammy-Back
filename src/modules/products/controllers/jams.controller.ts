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
import { JamServices } from '../services/jam.service';
import { JamDTO } from '../dtos/jams.dto';

@Controller('products')
export class JamController {
  constructor(private readonly jamServices: JamServices) {}
  // Ordering matters.
  // Get single product from searching name
  @Get('search')
  async searchForJamByName(@Query('term') term?: string): Promise<any> {
    const jam = await this.jamServices.getJamByName(term);
    return { message: 'Retrieved product', data: jam };
  }

  // Get single product by id
  @Get(':jamId')
  async getJam(@Param('jamId', ParseIntPipe) jamId: number): Promise<any> {
    const jam = await this.jamServices.getJamById(jamId);
    return { message: 'Retrieved product', data: jam };
  }

  // Get all products
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
    return { message: 'Retrieved Products', data: products };
  }

  // Create product
  @Post()
  async create(@Body() body: JamDTO) {
    console.log(body);
    const createdProduct = await this.jamServices.createProduct(body);
    return {
      message: `Created a new product`,
      data: createdProduct,
      status: true,
    };
  }

  // Update a product
  // @Patch(':jamId')
  // async updateProduct(
  //   @Body() body: ProductUpdateDTO,
  //   @Param('jamId', ParseIntPipe) jamId: number,
  // ) {
  //   console.log(body);
  //   const updatedProduct = await this.jamServices.updateProduct(jamId, body);
  //   return { message: `Updated a product`, data: updatedProduct, status: true };
  // }
}
