export interface Dinero {
    disponible: number;
    aLiberar: number;
    transacciones?: transacion[];
}

export interface transacion {
    numMovimiento?: number;
    estado?: string; //exitosa - denegada
    tipo?: string, //pago-transacción
        nombreDestinatario?: string; //solo si es tipo transaccion
    fecha?: Date;
    valor?: number;
    disponible?: number;
}