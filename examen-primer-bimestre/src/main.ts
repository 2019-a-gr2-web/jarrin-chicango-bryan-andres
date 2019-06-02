import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
const cookieParcer = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParcer('weba'))
  //@ts-ignore
  app.set('view engine','ejs');
  await app.listen(3000);
}
bootstrap();
