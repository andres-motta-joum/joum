import { Producto } from "../producto/producto";
import { Opinion } from "../producto/producto";

import { Dinero } from "./subInterfaces/dinero";
import { ReporteReclamo } from "./subInterfaces/reporte-reclamo";
import { Compra } from "./subInterfaces/compra";
import { Venta } from "./subInterfaces/venta";
import { Facturacion } from "./subInterfaces/facturacion";
import { Notificacion, NotificacionesRecibidas } from "./subInterfaces/notificacion";
import { AtencionCliente } from "./subInterfaces/atencion-cliente";

export interface Usuario {
  //------------- perfil -------------- //
  id?: string;
  usuario?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  documento?: number;
  tipoDocumento?: string;
  telefono?: number;
  direcciones?: string[];
    direccionPrincipal?: string;
  seguidores?: number;
  diasComoVendedor?: number,
  //------------------------------------------- 
  dinero?: Dinero; 
  //-------------
  reportesreclamos?: ReporteReclamo[]; //---- Falta
  //------------- 
  ventas?: Venta[];  
  //------------- 
  compras?: Compra[]; 
  //------------- 
  favoritos?: Producto[];
  //------------- 
  opiniones?: Opinion[]; 
  //------------- 
  publicaciones?: Producto[]; 
  //-------------
  facturacion?: Facturacion;
  //-------------
  notificaciones?: Notificacion[];
  notificacionesRecibidas?: NotificacionesRecibidas;
  //-------------
  atencionCliente?: AtencionCliente[]; //--- Falta
  //---------------------------------------------
  carrito?: porComprar[];
  guardados?: porComprar[];
  historial?: Producto[];
  
  correoVerificado?: boolean;

  planJoum?: string;
}

interface porComprar{
  producto?: Producto;
  cantidad?: number;
}
