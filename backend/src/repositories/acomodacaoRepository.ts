import { AcomodacaoCreationData } from "../domain/AcomodacaoBuilder.js";
import { Acomodacao } from "../models/acomodacoes.js";

export const acomodacaoRepository = {
  findAll: async (): Promise<Acomodacao[]> => {
    return Acomodacao.findAll();
  },

  save: async (data: AcomodacaoCreationData): Promise<Acomodacao> => {
    return Acomodacao.create({
      nomeAcomadacao: data.nomeAcomadacao,
      camaSolteiro: data.camaSolteiro,
      camaCasal: data.camaCasal,
      suite: data.suite,
      climatizacao: data.climatizacao,
      garagem: data.garagem,
    });
  },

  
  update: async (
    id: number,
    data: Partial<AcomodacaoCreationData>
  ): Promise<Acomodacao | null> => {
    const [updatedRows] = await Acomodacao.update(data, {
      where: { id: id },
    });

    if (updatedRows > 0) {
      return Acomodacao.findByPk(id);
    }
    return null;
  },

  delete: async (id: number): Promise<number> => {
    return Acomodacao.destroy({
      where: { id: id },
    });
  },
};