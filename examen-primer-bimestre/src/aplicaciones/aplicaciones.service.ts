import { Injectable } from '@nestjs/common';
import { Aplicacion } from './aplicacion'
import {Sistema} from '../sistemasOperativos/sistema'
import { SistemasOperativosService } from 'src/sistemasOperativos/sistemas.service';
import { createReadStream } from 'fs';
Injectable()
export class AplicacionService {
    bddAplicaciones:Aplicacion[]=[];
    recnum=1;
    constructor(private readonly _sistemaServices:SistemasOperativosService){
        const aplicacion:Aplicacion={
            nombre:'Visual Studio Code',
            fechaLanzamiento:new Date(2009,10,22),
            costo:10.5,
            pesoEnGigas:1.3,
            sistemaOperativoId:1,
            urlDescarga:'https://code.visualstudio.com/',
            version:1.5
        }
        this.crear(aplicacion);
        
    }
    crear(nuevaAplicacion:Aplicacion):Aplicacion{
        nuevaAplicacion.id = this.recnum;
        this.bddAplicaciones.push(nuevaAplicacion);
        this.recnum++;
        return nuevaAplicacion;
    }

    lista(id:number):Aplicacion[]{
        let listaAplicaciones = this.bddAplicaciones.filter(
            (aplicacion)=>{
                return aplicacion.sistemaOperativoId === id;
            }
        );
        return listaAplicaciones;
    }
    buscarAplicacion(id:number,nombre:string):Aplicacion[]{
        console.log(this.bddAplicaciones);
        let lista_busqueda  = this.bddAplicaciones.filter((aplicaion)=>{
            return (aplicaion.nombre === nombre && aplicaion.sistemaOperativoId===id);
        });
        return lista_busqueda;
    }
    buscarAplicacionXso(id:number):Aplicacion[]{
        console.log(this.bddAplicaciones);
        let lista_busqueda  = this.bddAplicaciones.filter((aplicaion)=>{
            return (aplicaion.sistemaOperativoId===id);
        });
        return lista_busqueda;
    }
    eliminarPorId(id:number):Aplicacion[]{
        const indice = this.bddAplicaciones.findIndex(
            (aplicacion)=>{
                return aplicacion.id === id;
            }
        );
        this.bddAplicaciones.splice(indice,1);
        return this.bddAplicaciones;
    }
}
