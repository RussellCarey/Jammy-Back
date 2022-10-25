import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jam } from '../entities/jams.entity';
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
      where: { jam_title: ILike(`%${term}%`) },
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

  async createJam(jamData: JamDTO): Promise<Jam> {
    console.log(jamData);
    const jam = await this.jamRepository.save(jamData);
    return jam;
  }

  async updateJam(id: number, jamData: JamDTO): Promise<any> {
    // const jam = await this.jamRepository.update(id, jamData);
    const result = await this.jamRepository
      .createQueryBuilder()
      .update<Jam>(Jam, { ...jamData })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }
}
