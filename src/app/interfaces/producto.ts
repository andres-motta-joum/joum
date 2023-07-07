export interface Producto {
    id?: string; /*-- sin ? __*/
    idVendedor?: string; /*-- sin ? __*/
    categoria?: string; /*-- sin ? __*/
    nombre?: string; /*-- sin ? __*/
    fabricante?: string; /*-- sin ? __*/
    foto?: string; /*-- sin ? __*/
    marca?: string;
    precio: number; /*-- sin ? __*/
    condicion?: string; /*-- sin ? __*/
    descripcion?: string; /*-- sin ? __*/
    calificacion?: number; /*-- sin ? __*/
    calificadores?: number; /*-- sin ? __*/
    descuento: number; /*-- sin ? __*/
    cantidad?: string; /*-- sin ? __*/
    codigoUniversal?: string; /*-- sin ? __*/
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
  