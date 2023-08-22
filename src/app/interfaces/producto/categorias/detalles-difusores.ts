export interface DetallesDifusores {
    marca?: string,       /*--- Principales ---*/
    modelo?: string,

    colores?: string[],   /*--- visual ---*/
    fotos?: string[][],
    
    tipo?: string,
    tecnologiaDifusion?: string,
    material?: string,

    temporizador?: boolean, /*--- preguntas si/no ---*/
    lucesLed?: boolean,
    apagadoAutomatico?: boolean,

    instruccionesUso?:string,

    formatoVenta?: string,
        unidadesPack?: number,
}
