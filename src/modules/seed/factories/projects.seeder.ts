import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { Project } from 'src/modules/projects/projects.entity';
import { faker } from '@faker-js/faker';
import { SeederInterface } from '../seeder.interface';

@Injectable()
export class ProjectsSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async seed() {
    const numberOfItemsToAdd = 20;
    const data: Partial<Project>[] = [];

    for (let i = 0; i < numberOfItemsToAdd; i++) {
      const projectTitle = faker.random.words(3);
      data.push({
        // Insert object of data for each item..
        project_title: projectTitle,
        project_title_slug: projectTitle.replace(' ', '-'),
        project_description: faker.random.words(10),
        youtube_url:
          'https://www.youtube.com/watch?v=Yhu6jwhJQjk&t=1866s&ab_channel=XTechnology',
        github_url: 'https://github.com/gochiso/mamoru-web-app',
        live_site_url: 'www.russell-carey.com',
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.projectRepository.insert(data);
    });
  }
}
