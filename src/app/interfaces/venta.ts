import { Producto } from "./producto/producto";
import { referenciaCompra } from "./usuario/usuario";
import { Direccion } from "./usuario/subInterfaces/direccion";

export interface Venta {
    productos?: Producto[]; // BORRAR --------------------------
        unidades?: number[]; // BORRAR --------------------------
    //-----------------------
    numVenta: number;
    referencias: referenciaCompra[];
    fechaVenta?: any; //= fecha preparación
    //---- estado -----
    enCamino?: boolean;
        fechaEnCamino?: Date;
    entregado?: boolean,
        fechaEntrega?: Date;
    aproxEntrega?: Date; // Si fechaEntrega = '';

    idCliente?: string;
    idVendedor?: string;
    datosEnvio?: Direccion;
    
    cancelada?: boolean;
}
