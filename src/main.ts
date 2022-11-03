import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './common/exceptions/http-catch.exception';
import * as Session from 'express-session';
import * as passort from 'passport';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    // Get all sessions..?
    // https://stackoverflow.com/questions/72076125/nest-js-getting-session-data-from-the-memory-store
    Session({
      name: 'SESH_ID',
      secret: process.env.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
      },
    }),
  );

  app.use(passort.initialize());
  app.use(passort.session());
  await app.listen(process.env.PORT);
}
bootstrap();
