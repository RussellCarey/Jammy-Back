import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favourite } from './favourite.entity';
import { FavouriteController } from './favourite.controller';
import { FavouriteServices } from './favourite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite])],
  controllers: [FavouriteController],
  providers: [FavouriteServices],
})
export class FavouriteModule {}
