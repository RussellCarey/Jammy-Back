import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from './achievements.entity';
import { Repository, ILike } from 'typeorm';
import { AchievementUpdateDTO } from './achievements.update.dto';
import { AchievementDTO } from './achievements.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  async getById(id: number): Promise<Achievement> {
    const team = await this.achievementRepository.findOne({
      where: {
        id: id,
      },
    });
    return team;
  }

  async getAll(params: {
    order?: any;
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<Achievement[]> {
    const { skip, take, order, where } = params;
    const achievements = await this.achievementRepository.find({
      skip,
      take,
      order,
      where,
    });
    return achievements;
  }

  async create(achievementData: AchievementDTO): Promise<Achievement> {
    console.log(achievementData);
    const achievement = await this.achievementRepository.save(achievementData);
    return achievement;
  }

  async update(
    id: number,
    achievementData: AchievementUpdateDTO,
  ): Promise<Achievement> {
    const result = await this.achievementRepository
      .createQueryBuilder()
      .update<Achievement>(Achievement, { ...achievementData })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async delete(id: number): Promise<Achievement | undefined> {
    const deletedTeam = await this.achievementRepository.delete(id);
    return deletedTeam.raw[0];
  }
}
