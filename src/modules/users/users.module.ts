import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [],
})
export class UserModule {}
