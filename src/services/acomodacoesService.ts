
import { NomeAcomadacao } from "../enumeradores/tipoAcomidacao";
import Acomodacao from "../interfaces/acomodacoes";


const ACOMODACOES_KEY = 'acomodacoes';

const defaultAcomodacoes: Acomodacao[] = [
    {
        id: 1,
        nomeAcomadacao: NomeAcomadacao.SolteiroSimples,
        camaCasal: 0,
        camaSolteiro: 1,
        climatizacao: true,
        garagem: 0,
        suite: 1,
    },
    {
        id: 2,
        nomeAcomadacao: NomeAcomadacao.SolteiroMais,
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1, 
        suite: 1,
    },
    {
        id: 3,
        nomeAcomadacao: NomeAcomadacao.CasalSimples,
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    {
        id: 4,
        nomeAcomadacao: NomeAcomadacao.FamilaSimples,
        camaCasal: 1,
        camaSolteiro: 2,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    {
        id: 5,
        nomeAcomadacao: NomeAcomadacao.FamiliaSuper,
        camaCasal: 2,
        camaSolteiro: 6,
        climatizacao: true,
        garagem: 2,
        suite: 3
    },
    {
        id: 6,
        nomeAcomadacao: NomeAcomadacao.FamiliaMais,
        camaCasal: 1,
        camaSolteiro: 5,
        climatizacao: true,
        garagem: 2,
        suite: 2
    }
];

export const fetchAcomodacoes = (): Acomodacao[] => {
    const acomodacoesData = localStorage.getItem(ACOMODACOES_KEY);
    if (acomodacoesData) {
        return JSON.parse(acomodacoesData);
    }
    return [];
};

export const initAcomodacoes = (): void => {
    const acomodacoes = fetchAcomodacoes();
    if (acomodacoes.length === 0) {
    
        localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(defaultAcomodacoes));
    }
};

initAcomodacoes();


export const addAcomodacao = (newAcomodacao: Acomodacao): void => {
    const acomodacoes = fetchAcomodacoes();
    

    const maxId = acomodacoes.reduce((max, a) => (a.id > max ? a.id : max), 0);
    newAcomodacao.id = maxId + 1;
    
    acomodacoes.push(newAcomodacao);
    localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(acomodacoes));
};

export const editAcomodacao = (updatedAcomodacao: Acomodacao): void => {
    const acomodacoes = fetchAcomodacoes();
    const acomodacaoIndex = acomodacoes.findIndex(a => a.id === updatedAcomodacao.id);
    
    if (acomodacaoIndex === -1) {
        throw new Error('Acomodação não encontrada');
    }

    acomodacoes[acomodacaoIndex] = updatedAcomodacao;
    localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(acomodacoes));
};

export const removeAcomodacao = (id: number): void => {
    let acomodacoes = fetchAcomodacoes();
    acomodacoes = acomodacoes.filter(a => a.id !== id);
    localStorage.setItem(ACOMODACOES_KEY, JSON.stringify(acomodacoes));
};