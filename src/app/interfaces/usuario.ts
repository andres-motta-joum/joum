import { ProductoAux } from "./producto";

export interface Usuario {
  idCliente?: string;/*Sin ?*/
  nombreCliente?: string;/*Sin ?*/
  apellidoCliente?: string;/*Sin ?*/
  correoCliente?: string;/*Sin ?*/
  telCliente?: number;/*Sin ?*/
  nivelCliente?: string;/*Sin ?*/
  plan?: string;/*Sin ?*/
  fotoPerfil?: string;/*Sin ?*/
  favoritos?: string[];
  correoVerificado?: boolean;/*Sin ?*/
  withoutVery?: boolean;
  modificarCliente?: (object: UsuarioModificacion, cb: (mensaje: string) => void) => void;
  subirProducto?: (objeto: ProductoAux) => Promise<string>;
  cerrarSesion?: () => void;
  agregarFavorito?: (producto: string, adicion: boolean) => Promise<string>;
}

export interface UsuarioAux {
  idCliente?: string;
  nombreCliente: string;
  apellidoCliente: string;
  correoCliente: string;
  telCliente: number;
  nivelCliente: string;
  plan: string;
  fotoPerfil: string;
  favoritos?: string[];
  correoVerificado: boolean;
  withoutVery?: boolean;
}

export interface UsuarioModificacion {
  nombreCliente?: string;
  apellidoCliente?: string;
  correoCliente?: string;
  telCliente?: number;
  nivelCliente?: string;
  plan?: string;
  fotoPerfil?: File;
  correoVerificado?: boolean;
  withoutVery?: boolean;
}
