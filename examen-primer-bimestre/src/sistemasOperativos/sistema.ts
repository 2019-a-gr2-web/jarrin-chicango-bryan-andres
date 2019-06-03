export interface Sistema{
    id?:number;
    nombre:string;
    versionApi:number;
    fechaLanzamiento:Date;
    pesoEnGigas:number;
    instalado:boolean;
}