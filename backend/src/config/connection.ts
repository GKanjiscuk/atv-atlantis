import { Sequelize } from "sequelize-typescript";
import { Cliente } from "../models/cliente.js";
import { Telefone } from "../models/telefone.js";
import { Endereco } from "../models/endereco.js";
import { Documento } from "../models/documento.js";
import { Acomodacao } from "../models/acomodacoes.js";
import { ClienteHospedagem, Hospedagem } from "../models/hospedagem.js";

const sequelize = new Sequelize({
  database: "atlantis_atvv",
  username: "root",
  password: "root",
  host: "localhost",
  port: 3306,
  dialect: "mysql",

  models: [
    Telefone,
    Endereco,
    Documento,
    Acomodacao,
    Hospedagem,
    ClienteHospedagem,
    Cliente,
  ],
});

export default sequelize;
