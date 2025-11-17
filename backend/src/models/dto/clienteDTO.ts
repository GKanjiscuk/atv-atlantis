export interface TelefoneInput {
  ddd: number;
  numero: string;
}
export interface DocumentoInput {
  numero: string;
  tipo: string;
  dataExpedicao: Date;
}
export interface EnderecoInput {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
}

export interface ClienteCreationData {
  nome: string;
  nomeSocial: string;
  dataNascimento: Date;
  dataCadastro: Date;
  titularId?: number;

  endereco: EnderecoInput;
  telefones: TelefoneInput[];
  documentos: DocumentoInput[];
}
