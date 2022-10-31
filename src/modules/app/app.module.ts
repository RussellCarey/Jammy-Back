import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { JamModule } from '../jams/jams.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TeamModule } from '../teams/teams.module';
import { UserModule } from '../users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ProjectModule } from '../projects/projects.module';
import { PassportModule } from '@nestjs/passport';
import { GithubModule } from '../auth/github.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    JamModule,
    TeamModule,
    AuthModule,
    ProjectModule,
    GithubModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
