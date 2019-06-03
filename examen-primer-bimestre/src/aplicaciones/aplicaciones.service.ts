import { Injectable } from '@nestjs/common';
import { Aplicacion } from './aplicacion'
import {Sistema} from '../sistemasOperativos/sistema'
import { SistemasOperativosService } from 'src/sistemasOperativos/sistemas.service';
import { createReadStream } from 'fs';
Injectable()
export class AplicacionService {
    bddAplicaciones:Aplicacion[]=[];
    contadorID=1;
    constructor(private readonly _sistemaServices:SistemasOperativosService){
        const aplicacion:Aplicacion={
            nombre:'Pentahoo',
            fechaLanzamiento:new Date(2019,12,12),
            costo:100,
            pesoEnGigas:1.5,
            sistemaOperativoId:1,
            urlDescarga:'https://www.hitachivantara.com/go/pentaho.htmlv',
            version:8.2
        }

        this.crear(aplicacion);

    }
    crear(nuevaAplicacion:Aplicacion):Aplicacion{
        nuevaAplicacion.id = this.contadorID;
        this.bddAplicaciones.push(nuevaAplicacion);
        this.contadorID++;
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
