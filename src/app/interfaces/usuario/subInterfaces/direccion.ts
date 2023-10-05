export interface Direccion {
    nombresApellidos: string,
    telefono: string,
    tipoIdentidad: string,
    numeroIdentificacion: string,
    municipioLocalidad: string,
    barrio: string,
    direccion?: string[]; //['tipoCalle','calle','numero','guion'];
    detalle: string,
    indicaciones?: string,
    direccionPredeterminada: boolean
}
