export interface DetallesVinilos {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    autoria?: string,
    diseño?: string, //figuras, frases,etc
    material?: string,
    tematica?: string, //inspiracion, naturaleza, etc

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,
    
    formatoVenta?: string,
        unidadesPack?: number,
}
