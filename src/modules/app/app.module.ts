import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { JamModule } from '../jams/jams.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TeamModule } from '../teams/teams.module';
import { UserModule } from '../users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    JamModule,
    TeamModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
