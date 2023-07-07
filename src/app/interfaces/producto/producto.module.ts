export interface Producto {
  id?: string; /*Sin ?*/
  idVendedor?: string;/*Sin ?*/
  categoria?: string;/*Sin ?*/
  nombre: string;/*Sin ?*/
  fabricante?: string;/*Sin ?*/
  foto?: File | string;/*Sin ?*/
  marca?: string;
  precio: number;/*Sin ?*/
  condicion?: string;/*Sin ?*/
  descripcion?: string;/*Sin ?*/
  calificacion?: number;/*Sin ?*/
  calificadores?: number;/*Sin ?*/
  descuento: number;/*Sin ?*/
  cantidad?: string;/*Sin ?*/
  codigoUniversal?: string;/*Sin ?*/
  colorMarco?: string;
  tematica?: string;
  ancho?: string;
  altura?: string;
  color?: string;
  sku?: string;
  acabado?: string;
  largo?: string;
  profundidad?: string;
  espesor?: string;
  tipo?: string;
  material?: string;
  ensamblado?: string;
  kitInstalacion?: string;
  colorBase?: string;
  diametro?: string;
  materialPantalla?: string;
  nombreDiseño?: string;
  diametroBoca?: string;
  unidadesPorEnvase?: string;
  forma?: string;
  capacidadEnVolumen?: string;
  colorFondo?: string;
  diseño?: string;
  diseñoTela?: string;
  ambienteRecomendado?: string;
  esArtesanal?: string;
  superficiesRecomendadas?: string;
  ambientesRecomendables?: string;
  aptoParaPared?: string;
  aptoParaAutos?: string;
  aptoParaHeladera?: string;
  esFluorecente?: string;
  es3D?: string;
}

export interface ProductoAux {
  id?: string;
  idVendedor?: string;
  categoria: string;
  nombre: string;
  fabricante: string;
  foto: File | string;
  marca?: string;
  precio: number;
  condicion: string;
  descripcion: string;
  calificacion: number;
  calificadores: number;
  descuento: number;
  cantidad: string;
  codigoUniversal: string;
  colorMarco?: string;
  tematica?: string;
  ancho?: string;
  altura?: string;
  color?: string;
  sku?: string;
  acabado?: string;
  largo?: string;
  profundidad?: string;
  espesor?: string;
  tipo?: string;
  material?: string;
  ensamblado?: string;
  kitInstalacion?: string;
  colorBase?: string;
  diametro?: string;
  materialPantalla?: string;
  nombreDiseño?: string;
  diametroBoca?: string;
  unidadesPorEnvase?: string;
  forma?: string;
  capacidadEnVolumen?: string;
  colorFondo?: string;
  diseño?: string;
  diseñoTela?: string;
  ambienteRecomendado?: string;
  esArtesanal?: string;
  superficiesRecomendadas?: string;
  ambientesRecomendables?: string;
  aptoParaPared?: string;
  aptoParaAutos?: string;
  aptoParaHeladera?: string;
  esFluorecente?: string;
  es3D?: string;
}

export interface ProductoModificacion {
  categoria?: string;
  nombre?: string;
  fabricante?: string;
  foto?: File | string;
  marca?: string;
  precio?: number;
  condicion?: string;
  descripcion?: string;
  calificacion?: number;
  calificadores?: number;
  descuento?: number;
  cantidad?: string;
  codigoUniversal?: string;
  colorMarco?: string;
  tematica?: string;
  ancho?: string;
  altura?: string;
  color?: string;
  sku?: string;
  acabado?: string;
  largo?: string;
  profundidad?: string;
  espesor?: string;
  tipo?: string;
  material?: string;
  ensamblado?: string;
  kitInstalacion?: string;
  colorBase?: string;
  diametro?: string;
  materialPantalla?: string;
  nombreDiseño?: string;
  diametroBoca?: string;
  unidadesPorEnvase?: string;
  forma?: string;
  capacidadEnVolumen?: string;
  colorFondo?: string;
  diseño?: string;
  diseñoTela?: string;
  ambienteRecomendado?: string;
  esArtesanal?: string;
  superficiesRecomendadas?: string;
  ambientesRecomendables?: string;
  aptoParaPared?: string;
  aptoParaAutos?: string;
  aptoParaHeladera?: string;
  esFluorecente?: string;
  es3D?: string;
}
