export interface DetallesRepisas {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    cantidadPiezas?: number,
    forma?: string,
    materia?: string,
    autoria?: string,

    altura?: number,      /*--- medición ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,
    profundidad?: number,
    unidadMedidaProfundidad?: string,
    peso?: number,
    unidadMedidaPeso?: string,

    kitInstalacion?: boolean,

    formatoVenta?: string,
        unidadesPack?: number,
}
