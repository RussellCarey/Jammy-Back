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
import { FavouritedProjectsModule } from '../favourited-projects/favourited-projects.module';
import { SeedModule } from '../seed/seeder.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    SeedModule,
    UserModule,
    JamModule,
    TeamModule,
    AuthModule,
    ProjectModule,
    FavouritedProjectsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    PassportModule.register({ session: true }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
