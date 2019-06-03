import { Module } from '@nestjs/common';
import { LoginModule } from 'src/login/login.module';
import { AplicacionController } from './aplicacion.controller';
import { AplicacionService } from './aplicaciones.service';
@Module({
  imports: [LoginModule],
  controllers: [AplicacionController],
  providers: [AplicacionService],
  exports:[AplicacionService]
})
export class AplicacionModule {}