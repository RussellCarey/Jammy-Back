import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { FavouritedProjects } from 'src/modules/favourited-projects/favourited-projects.entity';
import { faker } from '@faker-js/faker';
import { SeederInterface } from '../seeder.interface';

@Injectable()
export class FavouritedProjectsSeeder implements SeederInterface {
  constructor(
    @InjectRepository(FavouritedProjects)
    private readonly favouritedProjectsRepository: Repository<FavouritedProjects>,
  ) {}

  async seed() {
    const numberOfItemsToAdd = 10;
    const data: Partial<FavouritedProjects>[] = [];

    for (let i = 0; i < numberOfItemsToAdd; i++) {
      data.push({
        userId: faker.datatype.number({
          min: 1,
          max: 9,
        }),
        projectId: faker.datatype.number({
          min: 1,
          max: 9,
        }),
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.favouritedProjectsRepository.insert(data);
    });
  }
}
