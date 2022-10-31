import { Module } from '@nestjs/common';
import { GithubController } from './github.auth.controller';
import { GithubService } from './github.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [],
  controllers: [GithubController],
  providers: [GithubService, GithubStrategy],
})
export class GithubModule {}
