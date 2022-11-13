import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jam } from './jams.entity';
import { JamController } from './jams.controller';
import { JamServices } from './jams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jam])],
  controllers: [JamController],
  providers: [JamServices],
})
export class JamModule {}
