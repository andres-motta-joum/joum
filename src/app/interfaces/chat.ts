export interface Chat {
    numVenta?: number;
    mensajes?: Mensaje[];
    bloqueo?: boolean;
    //productos?: Producto[];
}
export interface Mensaje{
    fecha?: Date;
    contenido?: string;
    remitente?: string; //Cliente / vendedor
}