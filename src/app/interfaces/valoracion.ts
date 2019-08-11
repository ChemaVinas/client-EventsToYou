export interface Valoracion {
    id?: number;
    comentario: string;
    puntuacion: number;
    fecha?: Date;
    fechaString?: string;
    id_evento?: number;
    login_miembro?: string;
    nombre_miembro?: string;
    titulo_evento?: string;
}
