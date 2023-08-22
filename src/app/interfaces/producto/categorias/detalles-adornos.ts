export interface DetallesAdornos {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    autoria?: string,
    material?: string,
    tema?: string, //Navideño, de animales, anime...
    linea?: string, //Cabezones
    personaje?: string,
    significado?: string,

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,
    profundidad?: number,
    unidadMedidaProfundidad?: string,

    coleccionable?: boolean,
        coleccion?: string, //A que colección pertenece
    incluyeAccesorios?: boolean,
    articulada?: boolean,   
    piezasIntercambiables?: boolean, 

    formatoVenta?: string,
        unidadesPack?: number,
}
