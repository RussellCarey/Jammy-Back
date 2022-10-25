import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Jam } from 'src/modules/products/entities/jam.entity';
import { JamController } from '../controllers/jams.controller';
import { JamServices } from '../services/jam.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jam])],
  controllers: [JamController],
  providers: [JamServices],
})
export class ProductsModule {}
