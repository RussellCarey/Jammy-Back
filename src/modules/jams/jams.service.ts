import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Jam } from './jams.entity';
import { Repository, ILike } from 'typeorm';
import { JamDTO } from './jams.dto';
import { JamUpdateDTO } from './jams.update.dto';

@Injectable()
export class JamServices {
  private readonly logger: Logger;
  constructor(@InjectRepository(Jam) private jamRepository: Repository<Jam>) {
    this.logger = new Logger();
  }

  async getJamById(id: number): Promise<Jam> {
    const jam = await this.jamRepository.findOne({
      where: { id: id, is_authorized: true },
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
      where: { jam_title: ILike(`%${term}%`), is_authorized: true },
    });
    return jam;
  }

  //TODO: Check how to limit max take to stop api abused.
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
      where: { is_authorized: false },
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

  // CRON functionality
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async checkForReleasedJams() {
    this.logger.log('Updated todays jams to has started');
    await this.jamRepository
      .createQueryBuilder()
      .update(Jam)
      .set({ has_started: true })
      .where('start_date < now() AND has_started = false')
      .execute();
  }
}
