import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jam } from './jams.entity';
import { Repository, ILike } from 'typeorm';
import { JamDTO } from './jams.dto';
import { JamUpdateDTO } from './jams.update.dto';

@Injectable()
export class JamServices {
  constructor(@InjectRepository(Jam) private jamRepository: Repository<Jam>) {}

  async getJamById(id: number): Promise<Jam> {
    const jam = await this.jamRepository.findOne({
      where: { id: id, isAuthorized: true },
    });
    return jam;
  }

  async getJamByName(
    term: string,
    params: {
      order?: any;
      skip?: number;
      take?: number;
      where?: any;
    },
  ): Promise<Jam[]> {
    const { skip, take, order } = params;
    const jam = await this.jamRepository.find({
      skip,
      take,
      order,
      where: { jam_title: ILike(`%${term}%`), isAuthorized: true },
    });
    return jam;
  }

  async getAllJams(params: {
    order?: any;
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<Jam[]> {
    const { skip, take, order, where } = params;
    const jams = await this.jamRepository.find({
      skip,
      take,
      order,
      where,
    });
    return jams;
  }

  async getAllUnauthorizedJams(params: {
    order?: any;
    skip?: number;
    take?: number;
  }): Promise<Jam[]> {
    const { skip, take, order } = params;
    const jams = await this.jamRepository.find({
      skip,
      take,
      order,
      where: { isAuthorized: false },
    });
    return jams;
  }

  async create(jamData: JamDTO): Promise<Jam> {
    const jam = await this.jamRepository.save(jamData);
    return jam;
  }

  async update(id: number, jamData: JamUpdateDTO): Promise<Jam> {
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

  async delete(id: number): Promise<Jam | undefined> {
    const deletedJam = await this.jamRepository.delete(id);
    return deletedJam.raw[0];
  }
}
