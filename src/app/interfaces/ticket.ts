import { Timestamp } from "@angular/fire/firestore";

export interface Ticket {
    id?: string;
    asunto: string;
    descripcion: string;
    idUsuario: string;
    idUsuarioInterno: string;
    tipo: string;
    fecha: Timestamp;
    estado: string;
    respuesta?: RespuestaTicket;
    reportado: boolean;
}

export interface RespuestaTicket {
    descripcion: string;
    fotos?: string[];
    fecha: Timestamp;
    visto: boolean;
}
