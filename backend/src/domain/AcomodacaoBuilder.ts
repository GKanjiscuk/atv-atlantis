
import { Acomodacao } from '../models/acomodacoes.js';

export interface AcomodacaoCreationData {
    nomeAcomadacao: string;
    camaSolteiro: number;
    camaCasal: number;
    suite: number;
    climatizacao: boolean;
    garagem: number;
}


export interface IAcomodacaoBuilder {
    setNome(nome: string): this;
    setCamaSolteiro(count: number): this;
    setCamaCasal(count: number): this;
    setSuite(count: number): this;
    setClimatizacao(has: boolean): this;
    setGaragem(count: number): this;
    build(): AcomodacaoCreationData;
}

export class AcomodacaoBuilder implements IAcomodacaoBuilder {

    private acomodacao: AcomodacaoCreationData;

    constructor() {
    
        this.acomodacao = {
            nomeAcomadacao: '',
            camaSolteiro: 0,
            camaCasal: 0,
            suite: 0,
            climatizacao: false,
            garagem: 0
        };
    }

    setNome(nome: string): this {
        this.acomodacao.nomeAcomadacao = nome;
        return this;
    }
    setCamaSolteiro(count: number): this {
        this.acomodacao.camaSolteiro = count;
        return this;
    }
    setCamaCasal(count: number): this {
        this.acomodacao.camaCasal = count;
        return this;
    }
    setSuite(count: number): this {
        this.acomodacao.suite = count;
        return this;
    }
    setClimatizacao(has: boolean): this {
        this.acomodacao.climatizacao = has;
        return this;
    }
    setGaragem(count: number): this {
        this.acomodacao.garagem = count;
        return this;
    }


    build(): AcomodacaoCreationData {
        return this.acomodacao;
    }
}