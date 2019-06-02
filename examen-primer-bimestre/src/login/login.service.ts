import { Injectable, Req, Res } from '@nestjs/common';

@Injectable()
export class LoginService {
    public hayCookie(@Req() req, @Res() res):boolean{
        const cookie = req.signedCookies;
        
        if(cookie.nombre){
          return true;
        }
        else{
          res.redirect('/api/auth/login');
          return false;
        }
    }
}