import { Acomodacao } from "../models/acomodacoes.js";
import { acomodacaoRepository } from "../repositories/acomodacaoRepository.js";
import {
  AcomodacaoBuilder,
  AcomodacaoCreationData,
} from "../domain/AcomodacaoBuilder.js";
import {
  DiretorCasalSimples,
  DiretorSolteiroSimples,
  DiretorSolteiroMais,
  DiretorFamiliaSimples,
  DiretorFamiliaMais,
  DiretorFamiliaSuper,
} from "../domain/Diretor.js";

export const acomodacaoService = {
  getAll: async (): Promise<Acomodacao[]> => {
    return acomodacaoRepository.findAll();
  },

  create: async (tipo: string): Promise<Acomodacao> => {
    const builder = new AcomodacaoBuilder();

    switch (tipo) {
      case "Solteiro Simples":
        new DiretorSolteiroSimples(builder).construir();
        break;
      case "Solteiro Mais":
        new DiretorSolteiroMais(builder).construir();
        break;
      case "Casal Simples":
        new DiretorCasalSimples(builder).construir();
        break;
      case "Família Simples":
        new DiretorFamiliaSimples(builder).construir();
        break;
      case "Família Mais":
        new DiretorFamiliaMais(builder).construir();
        break;
      case "Família Super":
        new DiretorFamiliaSuper(builder).construir();
        break;
      default:
        throw new Error("Tipo de acomodação inválido");
    }

    const novaAcomodacao = builder.build();
    return acomodacaoRepository.save(novaAcomodacao);
  },

  update: async (
    id: number,
    data: AcomodacaoCreationData
  ): Promise<Acomodacao> => {
    const acomodacao = await acomodacaoRepository.update(id, data);
    if (!acomodacao) {
      throw new Error("Acomodação não encontrada para atualização");
    }
    return acomodacao;
  },

  delete: async (id: number): Promise<void> => {
    const deleted = await acomodacaoRepository.delete(id);
    if (deleted === 0) {
      throw new Error("Acomodação não encontrada para exclusão");
    }
  },
};