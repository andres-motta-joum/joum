export interface DetallesRepisas {
    marca?: string,
    modelo?: string,

    estilos?: string[],
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    cantidadPiezas?: number,
    forma?: string,
    materia?: string,

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
