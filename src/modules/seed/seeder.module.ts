import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { SeedService } from './seeder.service';
import { Module } from '@nestjs/common';

// Entities
import { Jam } from '../jams/jams.entity';
import { User } from '../users/users.entity';
import { Team } from '../teams/teams.entity';
import { Project } from '../projects/projects.entity';

// Seeder
import { UsersSeeder } from './factories/users.seeder';
import { JamsSeeder } from './factories/jams.seeder';
import { ProjectsSeeder } from './factories/projects.seeder';
import { TeamSeeder } from './factories/teams.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Jam, Team, Project]),
  ],
  controllers: [],
  providers: [SeedService, ProjectsSeeder, UsersSeeder, JamsSeeder, TeamSeeder],
})
export class SeedModule {}
