export interface DetallesRelojes {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    tipo?: string, //pared o mesa
    estilo?: string,
    material?: string,
    panel?: string | boolean,
    alimentacion?: string, //pilas,enchufe,etc...
    montaje?: string, //descripción

    figura?: string,
        diametro?: number, /*--- diametros ---*/
        altura?: number,
        unidadMedidaAltura?: string,
        ancho?: number,
        unidadMedidaAncho?: number,

    formatoVenta?: string,
        unidadesPack?: number,
}
