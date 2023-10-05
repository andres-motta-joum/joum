export interface DetallesCuadros {
    marca?: string, 
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    tematica?: string,

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,

    panel?: boolean,
        tipoPanel?: string     /*--- preguntas si/no ---*/
    marco?: boolean,
        materialMarco?: string,
    frase?: boolean,

    formatoVenta?: string,
        unidadesPack?: number,
}
