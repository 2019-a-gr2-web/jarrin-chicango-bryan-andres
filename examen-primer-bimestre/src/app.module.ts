import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SistemasModule } from './sistemasOperativos/sistemas.module';
import { LoginModule } from './login/login.module';
import { AplicacionModule } from './aplicaciones/aplicacion.module';

@Module({
  imports: [SistemasModule,LoginModule,AplicacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
