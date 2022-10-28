import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository, ILike } from 'typeorm';
import { TeamUpdateDTO } from './teams.update.dto';

@Injectable()
export class TeamServices {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  // async getJamById(id: number): Promise<Jam> {
  //   const jam = await this.jamRepository.findOneBy({ id: id });
  //   return jam;
  // }

  // async getJamByName(term: string): Promise<Jam> {
  //   const jam = await this.jamRepository.findOne({
  //     where: { jam_title: ILike(`%${term}%`) },
  //   });
  //   return jam;
  // }

  // async getAllJams(params: {
  //   order?: any;
  //   skip?: number;
  //   take?: number;
  //   where?: any;
  // }): Promise<Jam[]> {
  //   const { skip, take, order, where } = params;
  //   const jams = await this.jamRepository.find({
  //     skip,
  //     take,
  //     order,
  //     where,
  //   });
  //   return jams;
  // }

  // async createJam(jamData: JamDTO): Promise<Jam> {
  //   console.log(jamData);
  //   const jam = await this.jamRepository.save(jamData);
  //   return jam;
  // }

  // async updateJam(id: number, jamData: JamUpdateDTO): Promise<Jam> {
  //   // const jam = await this.jamRepository.update(id, jamData);
  //   const result = await this.jamRepository
  //     .createQueryBuilder()
  //     .update<Jam>(Jam, { ...jamData })
  //     .where({
  //       id: id,
  //     })
  //     .returning('*')
  //     .execute();

  //   return result.raw[0];
  // }
}
