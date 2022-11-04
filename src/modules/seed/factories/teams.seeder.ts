import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Team } from 'src/modules/teams/teams.entity';
import { faker } from '@faker-js/faker';
import { SeederInterface } from '../seeder.interface';

@Injectable()
export class TeamSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async seed() {
    const numberOfItemsToAdd = 10;
    const data: Partial<Team>[] = [];

    for (let i = 0; i < numberOfItemsToAdd; i++) {
      const teamName = faker.random.words(3);
      data.push({
        // Insert object of data for each item..
        team_name: teamName,
        // team_name_slug: teamName.replace(' ', '-'),
        team_description: faker.random.words(10),
        team_image:
          'https://www.youtube.com/watch?v=Yhu6jwhJQjk&t=1866s&ab_channel=XTechnology',
        users: [],
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.teamRepository.insert(data);
    });
  }
}
