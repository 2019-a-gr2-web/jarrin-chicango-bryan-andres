import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";


const cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication

  app.use(cookieParser('Secret'));


  app.set('views engine', 'ejs' );
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  await app.listen(3001);
}
bootstrap();
