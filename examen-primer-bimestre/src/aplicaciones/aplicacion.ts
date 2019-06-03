export interface Aplicacion{
    id?:number;
    pesoEnGigas:number;
    version:number;
    nombre:string;
    urlDescarga:string;
    fechaLanzamiento:Date;
    costo:number;
    sistemaOperativoId:number;
}