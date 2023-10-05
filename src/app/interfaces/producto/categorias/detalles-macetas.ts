export interface DetallesMacetas {
    marca?: string,   
    modelo?: string,

    estilos?: string[],
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    estilo?: string,
    tipo?: string,

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
    material?: string,
    volumen?: number;
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
