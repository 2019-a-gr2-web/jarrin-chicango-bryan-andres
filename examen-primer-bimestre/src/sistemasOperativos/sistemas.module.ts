import { Module } from '@nestjs/common';
import {SistemasController} from './sistemas.controller';
import {SistemasOperativosService} from './sistemas.service';
import { LoginModule } from 'src/login/login.module';
@Module({
  imports: [LoginModule],
  controllers: [SistemasController],
  providers: [SistemasOperativosService],
  exports:[SistemasOperativosService]
})
export class SistemasModule {}
