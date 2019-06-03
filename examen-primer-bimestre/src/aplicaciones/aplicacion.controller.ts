import { Controller, Get, Res, Req, Query, Post, Body, Param } from '@nestjs/common';
import { AplicacionService } from './aplicaciones.service';
import { LoginService } from 'src/login/login.service';
import { Aplicacion } from 'src/aplicaciones/aplicacion';
import { createReadStream } from 'fs';

@Controller('api/aplicacion')
export class AplicacionController {
  constructor(private readonly _aplicacionSevice: AplicacionService,
              private readonly _loginServices:LoginService) {}
  @Get('crearForm')
    crearForm(@Res() res, @Req() req,@Query() query){
        if(this._loginServices.hayCookie(req,res)){
            res.render('aplicaciones/crear-aplicacion',{nombre:req.signedCookies.nombre,id:Number(query.id)});
        }
  }
  @Post('crear')
    crear(@Res() res, @Req() req,@Body() aplicacion:Aplicacion){
        aplicacion.sistemaOperativoId = Number(aplicacion.sistemaOperativoId);
        aplicacion.pesoEnGigas= Number(aplicacion.pesoEnGigas);
        aplicacion.costo = Number(aplicacion.costo);

        this._aplicacionSevice.crear(aplicacion);
        if(this._loginServices.hayCookie(req,res)){
            res.redirect('/api/aplicacion/gestion/'+Number(aplicacion.sistemaOperativoId));
        }
   }

  @Get('buscar')
  buscar(@Res() res, @Req() req,@Query() query)
  {
    let arreglo:Aplicacion[];
    console.log(query);
    if(query.busqueda.toString()===''){
        arreglo=this._aplicacionSevice.buscarAplicacionXso(Number(query.id));
    }
    else{
        arreglo=this._aplicacionSevice.buscarAplicacion(Number(query.id),query.busqueda.toString());
    }
      if(this._loginServices.hayCookie(req,res)){
          res.render('aplicaciones/lista-aplicaciones',{nombre:req.signedCookies.nombre,
              listaAplicaciones:arreglo,id:Number(query.id)});
      }
  }

  @Get('eliminar')
  eliminar(@Res() res, @Req() req,@Query() query){
    console.log(query);
    this._aplicacionSevice.eliminarPorId(Number(query.id));
    res.redirect('/api/aplicacion/gestion/'+Number(query.sistemaOperativoId));
  }

    @Get('gestion/:idSO')
    gestion(@Res() res, @Req() req)
    {
        let arregloAplicaciones = this._aplicacionSevice.lista(Number(req.params.idSO));
        if(this._loginServices.hayCookie(req,res)){
            res.render('aplicaciones/lista-aplicaciones',{nombre:req.signedCookies.nombre,
                listaAplicaciones:arregloAplicaciones,id:Number(req.params.idSO)});
        }
    }
}
