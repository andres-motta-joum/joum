export interface Chat {
    numVenta?: number;
    mensajes?: Mensaje[];
    bloqueoCliente?: boolean;
    bloqueoVendedor?: boolean;
    //productos?: Producto[];
}
export interface Mensaje{
    fecha: Date;
    contenido: string;
    remitente: string; //Cliente / vendedor
}