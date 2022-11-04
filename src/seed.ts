import { NestFactory } from '@nestjs/core';
import { SeedModule } from './modules/seed/seeder.module';
import { SeedService } from './modules/seed/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seeder = app.get(SeedService);
  await seeder.seed();
  await app.close();
}

bootstrap();
