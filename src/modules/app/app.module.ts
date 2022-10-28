import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { JamModule } from '../jams/jams.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TeamModule } from '../teams/teams.module';
import { UserModule } from '../users/users.module';

// Need to add MODULES to the imports
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    JamModule,
    TeamModule,
    UserModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
