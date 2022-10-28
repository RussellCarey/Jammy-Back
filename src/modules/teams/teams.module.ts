import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './teams.entity';
import { TeamsController } from './teams.controller';
import { TeamServices } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamsController],
  providers: [TeamServices],
})
export class TeamModule {}
