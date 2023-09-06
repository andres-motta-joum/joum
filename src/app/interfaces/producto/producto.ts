import { DetallesCuadros } from "./categorias/detalles-cuadros";
import { DetallesRepisas } from "./categorias/detalles-repisas";
import { DetallesIluminacion } from "./categorias/detalles-iluminacion";
import { DetallesMacetas } from "./categorias/detalles-macetas";
import { DetallesRelojes } from "./categorias/detalles-relojes";
import { DetallesDifusores } from "./categorias/detalles-difusores";
import { DetallesVinilos } from "./categorias/detalles-vinilos";
import { DetallesAdornos } from "./categorias/detalles-adornos";

export interface Producto {
  unidades?: number; // BORRAR
  //--------------------------------------------------------------
  id?: string; 
  idUsuario?: string; 
  verificado?: boolean,

//------------------------ FORMULARIO -----------
  categoria?: string; 

  nombre?: string;

  autoria?: string,
  marca?: string,       /*--- Principales ---*/
  modelo?: string,

  estilos?: Estilos[],   /*--- visual ---*/
  

  detalles?: DetallesCuadros | DetallesRepisas | DetallesIluminacion | DetallesMacetas | DetallesRelojes | DetallesDifusores | DetallesVinilos | DetallesAdornos;

  descripcion?: string;

  precio?: number;  

  envioGratis?: boolean,

  tipoPublicacion?: string,

//-----------------
  precioEnvio?: number;
  vistas?: number,
  descuento?: boolean; 
    porcentajeDescuento?: number;
    diasDescuento?: number;
    fechaDescuento?: Date,
  opiniones?: Opinion[],
    calificacion?: number,

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

interface Estilos {
  nombre?: string;
  fotos?: string[];
  unidades?: number;
  sku?: string;
}