import { NomeAcomadacao } from "../enumeradores/tipoAcomodacao";

export default interface Acomodacao {
  id: number;
  nomeAcomadacao: NomeAcomadacao;
  camaSolteiro: Number;
  camaCasal: Number;
  suite: Number;
  climatizacao: Boolean;
  garagem: Number;
}
