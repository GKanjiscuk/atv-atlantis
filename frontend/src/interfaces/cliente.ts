import Documento from "./documento.js";
import Endereco from "./endereco.js";
import Telefone from "./telefone.js";

export default interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  dataNascimento: Date;
  dataCadastro: Date;

  endereco: Endereco;
  telefones: Telefone[];
  documentos: Documento[];

  titularId: number | null;
  dependentes?: Cliente[];
}
