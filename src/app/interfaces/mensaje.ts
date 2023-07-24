export interface Mensaje {
    id?: string;
    productoId?: string;
    remitente?: string;
    contenido?: string;
    fecha?:Date;
    visto?:boolean;
}
