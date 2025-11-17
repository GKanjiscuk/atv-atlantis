import { TipoDocumento } from "../enumeradores/tipoDocumento"

export default interface Documento {
    id: number
    numero: string
    tipo: TipoDocumento
    dataExpedicao: Date
}

export {};
