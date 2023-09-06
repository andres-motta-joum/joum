export interface DetallesRelojes {
    marca?: string,
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    tipo?: string, //pared o mesa
    estilo?: string,
    material?: string,
    panel?: string | boolean,
    alimentacion?: string, //pilas,enchufe,etc...
    montaje?: string, //descripción

    figura?: string,
        diametro?: number, /*--- diametros ---*/
        unidadMedidaDiametro?: string,
        altura?: number,
        unidadMedidaAltura?: string,
        ancho?: number,
        unidadMedidaAncho?: number,

    formatoVenta?: string,
        unidadesPack?: number,
}
