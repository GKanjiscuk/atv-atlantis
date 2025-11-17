import { IAcomodacaoBuilder } from "./AcomodacaoBuilder.js";

interface IDiretor {
  construir(): void;
}

export class DiretorSolteiroSimples implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Solteiro Simples")
      .setCamaSolteiro(1)
      .setCamaCasal(0)
      .setSuite(1)
      .setClimatizacao(true)
      .setGaragem(0);
  }
}

export class DiretorCasalSimples implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Casal Simples")
      .setCamaSolteiro(0)
      .setCamaCasal(1)
      .setSuite(1)
      .setClimatizacao(true)
      .setGaragem(1);
  }
}

export class DiretorSolteiroMais implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Solteiro Mais")
      .setCamaSolteiro(0)
      .setCamaCasal(1)
      .setSuite(1)
      .setClimatizacao(true)
      .setGaragem(1);
  }
}

export class DiretorFamiliaSimples implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Família Simples")
      .setCamaSolteiro(2)
      .setCamaCasal(1)
      .setSuite(1)
      .setClimatizacao(true)
      .setGaragem(1);
  }
}

export class DiretorFamiliaMais implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Família Mais")
      .setCamaSolteiro(5)
      .setCamaCasal(1)
      .setSuite(2)
      .setClimatizacao(true)
      .setGaragem(2);
  }
}

export class DiretorFamiliaSuper implements IDiretor {
  constructor(private builder: IAcomodacaoBuilder) {}

  public construir(): void {
    this.builder
      .setNome("Família Super")
      .setCamaSolteiro(6)
      .setCamaCasal(2)
      .setSuite(3)
      .setClimatizacao(true)
      .setGaragem(2);
  }
}
