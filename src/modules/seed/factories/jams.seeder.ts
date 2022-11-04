import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Jam } from 'src/modules/jams/jams.entity';
import { faker } from '@faker-js/faker';
import { SeederInterface } from '../seeder.interface';

@Injectable()
export class JamsSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Jam)
    private readonly jamRepository: Repository<Jam>,
  ) {}

  async seed() {
    const numberOfItemsToAdd = 10;

    const data: Partial<Jam>[] = [];

    for (let i = 0; i < numberOfItemsToAdd; i++) {
      const jamTitle = faker.name.jobArea() + 'jam';
      data.push({
        // Insert object of data for each item..
        jam_title: jamTitle,
        jam_brief: faker.random.words(10),
        jam_description: faker.random.words(20),
        jam_image: 'IMAGE URL HERE',
        jam_title_slug: jamTitle.replace(' ', '-'),
        launch_date: faker.date.between(
          '2023-01-01T00:00:00.000Z',
          '2023-02-01T00:00:00.000Z',
        ),
        start_date: faker.date.between(
          '2023-03-01T00:00:00.000Z',
          '2023-06-01T00:00:00.000Z',
        ),
        end_date: faker.date.between(
          '2023-07-01T00:00:00.000Z',
          '2023-08-01T00:00:00.000Z',
        ),
        isAuthorized: faker.datatype.boolean(),
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.jamRepository.insert(data);
    });
  }
}
