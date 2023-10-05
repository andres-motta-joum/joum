export interface DetallesAdornos {
    marca?: string,
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    material?: string,
    tema?: string, //Navideño, de animales, anime...
    linea?: string, //Cabezones
    significado?: string,

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,
    profundidad?: number,
    unidadMedidaProfundidad?: string,

    personaje?: boolean, //CAMBIAR A BOOLEAN
    tipoPersonaje?: string;
    coleccionable?: boolean,
        coleccion?: string, //A que colección pertenece
    incluyeAccesorios?: boolean,
    articulada?: boolean,   
    piezasIntercambiables?: boolean, 

    formatoVenta?: string,
        unidadesPack?: number,
}
