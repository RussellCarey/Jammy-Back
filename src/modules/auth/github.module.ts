import { Module } from '@nestjs/common';
import { GithubController } from './github.auth.controller';
import { GithubService } from './github.service';
import { GithubStrategy } from './github.strategy';
import { SessionSerializer } from './utils/Serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserModule } from '../users/users.module';
import { UsersService } from '../users/users.services';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [GithubController],
  providers: [GithubService, UsersService, GithubStrategy, SessionSerializer],
})
export class GithubModule {}
