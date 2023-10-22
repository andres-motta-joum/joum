import { Producto } from "./producto/producto";
import { porComprar, referenciaCompra } from "./usuario/usuario";
import { Direccion } from "./usuario/subInterfaces/direccion";
import { DocumentData, DocumentReference, Timestamp } from "@angular/fire/firestore";

export interface Venta {
    productos?: Producto[]; // BORRAR --------------------------
        unidades?: number[]; // BORRAR --------------------------
    //-----------------------
    numVenta: number;
    referencias: porComprar[];
    fechaVenta?: any; //= fecha preparación
    //---- estado -----
    enCamino?: boolean;
        fechaEnCamino?: Date;
    entregado?: boolean,
        fechaEntrega?: Date;
    aproxEntrega?: Date; // Si fechaEntrega = '';

    idCliente: string;
    idVendedor: string;
    datosEnvio: Direccion;
    
    cancelada?: boolean;
    reclamos?: Reclamo[];
    despachosDemorados?: DespachoDemorado[],
}

export interface Reclamo {
    fecha: Timestamp;
    motivo: string; 
    descripcion: string; 
    estado: string; 
    respuesta: string;
    resueltoPor: string; 
    accion: string;
    fechaResolucion: Timestamp;
}

export interface DespachoDemorado {
    fecha: Timestamp
}