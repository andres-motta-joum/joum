import { Producto } from "../../producto/producto";

export interface Venta {
    numVenta?: number;
    productos?: Producto[];
        unidades?: number[];
    fechaVenta?: Date; //= fecha preparación
    //---- estado -----
    fechaEnCamino?: Date;
    enCamino?: boolean;
    fechaEntrega?: Date;
    entregado?: boolean,
    aproxEntrega?: string; // Si fechaEntrega = '';

    idCliente?: string;
    datosEnvio?: string;
    
    cancelada?: boolean;
}
