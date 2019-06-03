import { Injectable, Get, Res, Controller, Req, Body, Post, Param, Query } from '@nestjs/common';
import { SistemasOperativosService } from './sistemas.service';
import { LoginService } from 'src/login/login.service';
import { Sistema } from './sistema'
import { createReadStream } from 'fs';
@Controller('api/sistemas')
export class SistemasController {
    constructor(private readonly _sistemaServices:SistemasOperativosService,

                private _loginServices:LoginService){}
    @Get('lista')
    listaSistema(@Res() res,@Req() req)
    {
        
        if(this._loginServices.hayCookie(req,res)){
            res.render('sistemas/lista-sistemas',{nombre:req.signedCookies.nombre,
                listaSistemas:this._sistemaServices.bddSistemas});
        }
    }
    @Get('crearForm')
    crearForm(@Res() res, @Req() req)
    {
        if(this._loginServices.hayCookie(req,res)){
            res.render('sistemas/crear-sistema',{nombre:req.signedCookies.nombre});
        }
    }
    @Post('crear')
    crear(@Res() res, @Req() req,@Body() sistema:Sistema){
        this._sistemaServices.crear(sistema);
        res.redirect('/api/sistemas/lista');
    }
    @Post('buscar')
    buscar(@Res() res, @Req() req,@Body('busqueda') busqueda:string){
        let arreglo:Sistema[];
        if(busqueda===''){
            arreglo=this._sistemaServices.bddSistemas;
        }
        else{
            arreglo=this._sistemaServices.buscarPorNombre(busqueda);
        }
        if(this._loginServices.hayCookie(req,res)){
            res.render('sistemas/lista-sistemas',{nombre:req.signedCookies.nombre,
                listaSistemas:arreglo});
            
        }

    }


    @Get('eliminar')
    eliminar(@Res() res, @Req() req,@Query() query){
        this._sistemaServices.eliminarPorId(Number(query.id));
        res.redirect('/api/sistemas/lista');
    }


}
