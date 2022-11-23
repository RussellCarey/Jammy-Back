import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { SessionSerializer } from './utils/Serializer';
import { UsersService } from '../users/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GithubStrategy } from './github.strategy';
import { GitController } from './github.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [GitController],
  providers: [UsersService, SessionSerializer, GithubStrategy],
  exports: [],
})
export class AuthModule {}
