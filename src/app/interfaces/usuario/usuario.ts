import { Opinion } from "../producto/producto";

import { Dinero } from "./subInterfaces/dinero";
import { ReporteReclamo } from "./subInterfaces/reporte-reclamo";
import { Facturacion } from "./subInterfaces/facturacion";
import { Notificacion, NotificacionesRecibidas } from "./subInterfaces/notificacion";
import { AtencionCliente } from "./subInterfaces/atencion-cliente";
import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { Direccion } from "./subInterfaces/direccion";

export interface Usuario {
  //------------- perfil -------------- //
  id?: string;
  usuario: string;
  nombre: string;
  correo: string;
  telefono: number;
  seguidores: number;
  registroHistorial: boolean,
  fechaRegistro: Date,
  diasComoVendedor?: number,
  direcciones?: Direccion[],
  documento?: number,
  tipoDocumento?: string,
  //------------------------------------------- 
  dinero: Dinero; 
  //-------------
  reportesreclamos?: ReporteReclamo[]; //---- Falta
  //------------- 
  ventas?: DocumentReference<DocumentData>[]; //Cambiado 
  //------------- 
  compras?: DocumentReference<DocumentData>[]; //Cambiado 
  //------------- 
  favoritos?: DocumentReference<DocumentData>[];
  //------------- 
  opiniones?: Opinion[]; 
  //------------- 
  publicaciones?: DocumentReference<DocumentData>[]; 
  //-------------
  facturacion?: Facturacion;
  //-------------
  notificaciones?: Notificacion[];
  notificacionesRecibidas: NotificacionesRecibidas;
  //-------------
  atencionCliente?: AtencionCliente[]; //--- Falta
  //---------------------------------------------
  referenciaCompra?: referenciaCompra[]; //-- nueva
  carrito?: porComprar[];
  guardados?: porComprar[];
  historial?: DocumentReference<DocumentData>[];
  siguiendo?: string[];
  
  correoVerificado: boolean;
}

export interface porComprar{
  producto: DocumentReference<DocumentData>;
  unidades: number;
  estilo: string;
}

export interface referenciaCompra {
  producto: DocumentReference<DocumentData>;
  estilo: string;
  unidades: number
}
