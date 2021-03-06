export interface Evento {
    id?: number;
    titulo: string;
    descripcion: string;
    categoria: string;
    login_organizador?: string;
    nombre_organizador?: string;
    valoracion_media?: number;
    total_asistentes?: number;
    web_entradas: string;
    imagen?: any;
}
