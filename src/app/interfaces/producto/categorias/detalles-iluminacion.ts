export interface DetallesIluminacion {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    tecnologiaIluminacion?: string,   /*--- visual ---*/
    colores?: string[],
    fotos?: string[][],
    autoria?: string,

    subCategoria?: Bombillos | Lamparas | LetrerosLed,

    formatoVenta?: string,
        unidadesPack?: number,
}

interface Bombillos {
    potencia?: number,      /*--- valores ---*/
    temperaturaColor?: string,
    forma?: string,
    sistemasOperativosCompatibles?: string[],
    apliacionesCompatibles?: string[],

    wifi?: boolean,    /*--- preguntas si/no ---*/
    giratorio?: boolean,
        tipoRosca?: string,
}

interface Lamparas {
    tipo?: string,
    estilo?: string,
    material?: string,
    potencia?: number, 
    inalambrico?: boolean,
    autoadhesiva?: boolean,
    controlRemoto?: boolean,
    sistemaDePresion?: boolean,
    wifi?: boolean
}
interface LetrerosLed {
    diseño?: string,
    altura?: number,
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: string,
    tipoMensaje?: string,
    fuenteAlimentacion?: string,
    montaje?: string,

    control?: boolean,
        tipoControl?: string,
}