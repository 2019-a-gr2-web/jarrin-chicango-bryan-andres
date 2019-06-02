import { Request,Response, Controller, Get, Headers, Post, Body, Put, Query, Delete, Res, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { response } from 'express';
import { setMaxListeners } from 'cluster';

@Controller('/api/auth')
export class LoginController {
    constructor(private readonly _loginService: LoginService) {}
    @Get('login')
    login(@Res() res) {
        res.render('login/login');
    }
    @Get('salir')
    salir(@Res() res,@Req() req){
        res.cookie('nombre',null).redirect('/api/auth/login');
    }
    @Post('cookie')
    cookie(@Request() request, @Response() response, @Body('nombre') nombre:string) {
        response.cookie('nombre',nombre,{signed: true}).redirect('/api/inicio');;
    }

}