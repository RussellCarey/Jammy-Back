import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './projects.entity';
import { ProjetController } from './projects.controller';
import { ProjectServices } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjetController],
  providers: [ProjectServices],
})
export class TeamModule {}
