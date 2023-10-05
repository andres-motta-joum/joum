export interface Notificacion {
    foto: string;
    titulo: string;
    contenido: string;
    fecha: Date;
    tipo: string; //Ofertas y descuentos - Nuevas ventas - Publicaciones - Sobre mis reclamos - Nuevo mensaje
    link: string;
    visto: boolean;
}
export interface NotificacionesRecibidas {
    ofertasDecuentos: boolean;
    ventas: boolean;
    publicaciones: boolean;
    reclamos: boolean;
    mensajes: boolean;
}