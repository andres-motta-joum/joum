import { DetallesCuadros } from "./categorias/detalles-cuadros";
import { DetallesRepisas } from "./categorias/detalles-repisas";
import { DetallesIluminacion } from "./categorias/detalles-iluminacion";
import { DetallesMacetas } from "./categorias/detalles-macetas";
import { DetallesRelojes } from "./categorias/detalles-relojes";
import { DetallesDifusores } from "./categorias/detalles-difusores";
import { DetallesVinilos } from "./categorias/detalles-vinilos";
import { DetallesAdornos } from "./categorias/detalles-adornos";

export interface Producto {
  id?: string; 
  idUsuario?: string; 
  verificado?: boolean,

  categoria?: string; 
  nombre?: string;
  precio?: number; 
  descripcion?: string; 
  detalles?: DetallesCuadros | DetallesRepisas | DetallesIluminacion | DetallesMacetas | DetallesRelojes | DetallesDifusores | DetallesVinilos | DetallesAdornos;
  precioEnvio?: number;
  envioGratis?: boolean,
  unidades?: number; 

  vistas?: number,
  descuento?: boolean; 
    porcentajeDescuento?: number;
    diasDescuento?: number;
    fechaDescuento?: Date,
  opiniones?: Opinion[],
    calificacion?: number,
  tipoPublicacion?: string,

  ventas?: number,
  estado?: boolean
}

export interface Opinion {
  id?: string,
  idUsuario?: string,
  idProducto?: string,
  calificacion?: number,
  fecha?: Date,
  contenido?: string,
  numVenta?: number,
  check?: boolean,
}