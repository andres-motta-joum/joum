export interface DetallesVinilos {
    marca?: string, 
    modelo?: string,

    estilos?: string[], 
    fotos?: string[][],
    autoria?: string,
//--------------------------------------------------
    diseño?: string, //figuras, frases,etc
    material?: string,
    tematica?: string, //inspiracion, naturaleza, etc

    altura?: number,      /*--- diametros ---*/
    unidadMedidaAltura?: string,
    ancho?: number,
    unidadMedidaAncho?: number,
    
    formatoVenta?: string,
        unidadesPack?: number,
}
