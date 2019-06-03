import { Injectable } from '@nestjs/common';
import {Sistema} from './sistema';

@Injectable()
export class SistemasOperativosService {
  bddSistemas:Sistema[]=[];
  contadorID=1;
  
    constructor(){
        const sistema:Sistema={
            nombre:'Windows 10',
            fechaLanzamiento:new Date(2012,1111),
            instalado:true,
            pesoEnGigas:4.5,
            versionApi:4.7
        }
        this.crear(sistema);
    }

  crear(nuevoSistema:Sistema):Sistema{
      nuevoSistema.id = this.contadorID;
      this.bddSistemas.push(nuevoSistema);
      this.contadorID++;
      return nuevoSistema;
  }
  buscarPorNombre(nombre:string):Sistema[]{
      
      let lista_busqueda  = this.bddSistemas.filter((sistema)=>{
          return sistema.nombre === nombre;
      });
      return lista_busqueda;
  }
  eliminarPorId(id:number):Sistema[]{
      const indice = this.bddSistemas.findIndex(
          (sistema)=>{
              return sistema.id === id;
          }
      );
      this.bddSistemas.splice(indice,1);
      return this.bddSistemas;
  }

}
