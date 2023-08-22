export interface DetallesMacetas {
    marca?: string,        /*--- Principales ---*/
    modelo?: string,

    colores?: string[],     /*--- visual ---*/
    fotos?: string[][],
    estilo?: string,
    tipo?: string,
    autoria?: string,

    diametroBoca?: number,      /*--- diametros ---*/
    unidadMedidaDiametroBoca?: string,
    diametroBase?: number,
    unidadMedidaDiametroBase?: string,
    altura?: number,
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: string,
    largo?: number,
    unidadMedidaLargo?: string,
    forma?: string,
    material?: string,
    capacidadVolumen?: number;
    unidadMedidaVolumen?: string,

    sistemaAutorriego?: boolean,      /*--- preguntas si/no ---*/
    colgante?: boolean,
    incluyePlato?: boolean,
    agujerosDrenaje?: boolean,
    aptoParaHuerta?: boolean,
    conPlanta?: boolean,
        tipoPlanta?: string,

    formatoVenta?: string,
        unidadesPack?: number,
}
