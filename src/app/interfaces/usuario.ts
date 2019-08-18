export interface Usuario {
    login: string;
    clave?: string;
    nombre: string;
    ubicacion?: string;
    biografia?: string;
    descripcion?: string;
    web?: string;
    fecha_alta?: Date;
    fechaString?: string;
}
