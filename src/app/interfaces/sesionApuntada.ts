export interface SesionApuntada {
    id: number;
    id_evento: number;
    id_sesion: number;
    titulo_evento: string;
    fecha: Date;
    fechaString: string;
    login_miembro: string;
    nombre_miembro: string;
    ciudad_sesion: string;
}
