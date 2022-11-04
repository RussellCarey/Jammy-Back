import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavouritedProjects } from './favourited-projects.entity';
import { FavouritedProjectController } from './favourited-projects.controller';
import { FavouritedProjectServices } from './favourited-projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavouritedProjects])],
  controllers: [FavouritedProjectController],
  providers: [FavouritedProjectServices],
})
export class FavouritedProjectsModule {}
