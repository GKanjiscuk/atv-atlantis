import { z } from 'zod';

const telefoneSchema = z.object({
    ddd: z.number().min(10, "DDD inválido"),
    numero: z.string().min(8, "Número de telefone inválido"),
});

const documentoSchema = z.object({
    numero: z.string().min(1, "Número do documento é obrigatório"),
    tipo: z.enum(["CPF", "RG", "Passaporte"]),
    dataExpedicao: z.coerce.date(),
});

const enderecoSchema = z.object({
    rua: z.string().min(1, "Rua é obrigatória"),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(1, "Estado é obrigatório"),
    pais: z.string().min(1, "País é obrigatório"),
    codigoPostal: z.string().min(1, "CEP é obrigatório"),
});

export const clienteSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    nomeSocial: z.string(),
    dataNascimento: z.coerce.date(),
    dataCadastro: z.coerce.date(),
    titularId: z.number().nullable(),
    

    endereco: enderecoSchema,
    telefones: z.array(telefoneSchema).min(1, "Pelo menos um telefone é obrigatório"),
    documentos: z.array(documentoSchema).min(1, "Pelo menos um documento é obrigatório"),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;