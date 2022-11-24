import * as Session from 'express-session';
import * as passort from 'passport';
import helmet from 'helmet';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configService } from './config/config.service';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { HttpErrorFilter } from './common/exceptions/http-catch.exception';
import { ValidationFilter } from './common/exceptions/validation.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { createRedisStorage } from './createRedis';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

const sessionConfig = {
  name: '_jammy_slice',
  store: createRedisStorage(configService),
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: configService.isProduction() ? true : false,
  },
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use(Session(sessionConfig));

  app.use(passort.initialize());
  app.use(passort.session());

  console.log('We are in production mode?:');
  console.log(configService.isProduction());
  await app.listen(process.env.PORT);
}

bootstrap();
