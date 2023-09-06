export interface DetallesIluminacion {
    marca?: string,
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//-------------------------------

    tecnologiaIluminacion?: string,   /*--- visual ---*/

    subCategoria?: Bombillos | Lamparas | LetrerosLed,

    formatoVenta?: string,
        unidadesPack?: number,
}

interface Bombillos {
    temperaturaColor?: string,
    forma?: string,
    sistemasOperativosCompatibles?: string[],
    apliacionesCompatibles?: string[],
    potencia?: number,      /*--- valores ---*/
    unidadMedidaPotencia?: string;

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
    regulable?: boolean,
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