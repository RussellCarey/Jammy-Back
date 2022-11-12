import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { SeederInterface } from './seeder.interface';

// Factories
import { JamsSeeder } from './factories/jams.seeder';
import { ProjectsSeeder } from './factories/projects.seeder';
import { UsersSeeder } from './factories/users.seeder';
import { TeamSeeder } from './factories/teams.seeder';

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly connection: Connection,
    private readonly jamSeeder: JamsSeeder,
    private readonly userSeeder: UsersSeeder,
    private readonly projectSeeder: ProjectsSeeder,
    private readonly teamSeeder: TeamSeeder,
  ) {
    this.seeders = [this.jamSeeder, this.userSeeder];
  }

  async seed() {
    await this.connection.synchronize(true);

    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    });
  }
}
