import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { Repository, ILike } from 'typeorm';
import { TeamUpdateDTO } from './teams.update.dto';
import { TeamDTO } from './teams.dto';

@Injectable()
export class TeamServices {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getTeamById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        jam: true,
      },
    });
    return team;
  }

  async getTeamByName(term: string): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { team_name: ILike(`%${term}%`) },
    });
    return team;
  }

  async getAllTeams(params: {
    order?: any;
    skip?: number;
    take?: number;
    where?: any;
  }): Promise<Team[]> {
    const { skip, take, order, where } = params;
    const teams = await this.teamRepository.find({
      skip,
      take,
      order,
      where,
    });
    return teams;
  }

  async create(teamData: TeamDTO): Promise<Team> {
    console.log(teamData);
    const team = await this.teamRepository.save(teamData);
    return team;
  }

  async update(id: number, teamData: TeamUpdateDTO): Promise<Team> {
    const result = await this.teamRepository
      .createQueryBuilder()
      .update<Team>(Team, { ...teamData })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  async delete(id: number): Promise<Team | undefined> {
    const deletedTeam = await this.teamRepository.delete(id);
    return deletedTeam.raw[0];
  }
}
