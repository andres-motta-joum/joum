export interface DetallesDifusores {
    marca?: string,  
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//-------------------------------
    
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
