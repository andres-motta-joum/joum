export interface DetallesCuadros {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    tematica?: string,
    autoria?: string,

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,

    tipoPanel?: string,     /*--- preguntas si/no ---*/
    marco?: boolean,
        materialMarco?: string,
    frase?: boolean,

    formatoVenta?: string,
        unidadesPack?: number,
}
