import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,private _loginService:LoginService) {}

  @Get('inicio')
  inicio(@Req() req,@Res() res) {
    if(this._loginService.hayCookie(req,res)){
      res.render('inicio',{nombre:req.signedCookies.nombre})
    }
  }
}
