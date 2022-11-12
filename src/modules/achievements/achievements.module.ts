import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Achievement } from './achievements.entity';
import { AchievementsController } from './achievements.controller';
import { AchievementService } from './achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementsController],
  providers: [AchievementService],
})
export class AchievementModule {}
