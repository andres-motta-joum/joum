import { DetallesCuadros } from "./categorias/detalles-cuadros";
import { DetallesRepisas } from "./categorias/detalles-repisas";
import { DetallesIluminacion } from "./categorias/detalles-iluminacion";
import { DetallesMacetas } from "./categorias/detalles-macetas";
import { DetallesRelojes } from "./categorias/detalles-relojes";
import { DetallesDifusores } from "./categorias/detalles-difusores";
import { DetallesVinilos } from "./categorias/detalles-vinilos";
import { DetallesAdornos } from "./categorias/detalles-adornos";
import { DocumentData, DocumentReference, Timestamp } from "@angular/fire/firestore";

export interface Producto {
  //--------------------------------------------------------------
  id?: string, 
  idUsuario: string, 

//------------------------ FORMULARIO -----------
  categoria: string, 

  nombre: string,

  autoria: string,
  marca: string,       /*--- Principales ---*/
  modelo: string,

  estilos: DocumentReference<DocumentData>[],   /*--- visual ---*/
  

  detalles?: DetallesCuadros | DetallesRepisas | DetallesIluminacion | DetallesMacetas | DetallesRelojes | DetallesDifusores | DetallesVinilos | DetallesAdornos,

  descripcion?: string,

  precio: number,  

  envioGratis: boolean,

  tipoPublicacion: string,

  fecha: Timestamp;

//-----------------
  precioEnvio?: number,
  vistas: Vistas[],
  descuento?: boolean, 
    porcentajeDescuento?: number,
    diasDescuento?: number,
    fechaDescuento?: Date,
  opiniones: Opinion[],
    calificacion?: number,

  ventas: number, // No es necesario agregar la referencias, ya que no necesito los datos de las ventas aquí
  estado?: boolean
}

export interface Opinion {
  id?: string,
  idUsuario: string,
  idProducto: string,
  tituloProducto: string,
  foto: string,
  calificacion?: number,
  fecha: Timestamp,
  contenido?: string,
  numVenta: number,
  check: boolean,
}

export interface Estilo {
  id: string;
  nombre: string,
  fotos: DocumentReference<DocumentData>[],
  unidades: number,
  sku?: string
}

interface Vistas{
  fecha: Timestamp,
  cantidad: number
}