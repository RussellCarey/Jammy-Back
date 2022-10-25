import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Jam } from '../entities/jams.entity';
import { JamController } from '../controllers/jams.controller';
import { JamServices } from '../services/jams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jam])],
  controllers: [JamController],
  providers: [JamServices],
})
export class JamModule {}
