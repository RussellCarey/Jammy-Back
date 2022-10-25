import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jam } from 'src/modules/products/entities/jam.entity';
import { Repository, ILike } from 'typeorm';
import { JamDTO } from '../dtos/jams.dto';

@Injectable()
export class JamServices {
  constructor(@InjectRepository(Jam) private jamRepository: Repository<Jam>) {}

  async getJamById(id: number): Promise<Jam> {
    const jam = await this.jamRepository.findOneBy({ id: id });
    return jam;
  }

  async getJamByName(term: string): Promise<Jam> {
    const jam = await this.jamRepository.findOne({
      where: { product_name: ILike(`%${term}%`) },
    });
    return jam;
  }

  async getAllJams(params: {
    skip?: number;
    take?: number;
    order?: any;
    where?: any;
  }): Promise<Jam[]> {
    const { skip, take, order, where } = params;
    console.log(skip, take, order);

    const jams = await this.jamRepository.find({
      skip,
      take,
      order,
      where,
    });
    return jams;
  }

  async createProduct(prod: JamDTO): Promise<Jam> {
    const jam = await this.jamRepository.save(prod);
    console.log(jam);
    return jam;
  }
}
