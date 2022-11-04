import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { SeedService } from './seeder.service';
import { Module } from '@nestjs/common';

// Entities
import { Jam } from '../jams/jams.entity';
import { User } from '../users/user.entity';
import { Team } from '../teams/teams.entity';
import { Project } from '../projects/projects.entity';
import { FavouritedProjects } from '../favourited-projects/favourited-projects.entity';

// Seeder
import { UsersSeeder } from './factories/users.seeder';
import { JamsSeeder } from './factories/jams.seeder';
import { ProjectsSeeder } from './factories/projects.seeder';
import { FavouritedProjectsSeeder } from './factories/favourited-projects.seeder';
import { TeamSeeder } from './factories/teams.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Jam, Team, Project, FavouritedProjects]),
  ],
  controllers: [],
  providers: [
    SeedService,
    ProjectsSeeder,
    UsersSeeder,
    JamsSeeder,
    FavouritedProjectsSeeder,
    TeamSeeder,
  ],
})
export class SeedModule {}
