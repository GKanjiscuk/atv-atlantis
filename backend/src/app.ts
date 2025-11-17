import sequelize from "./config/connection.js";

import { acomodacaoRepository } from "./repositories/acomodacaoRepository.js";
import { acomodacaoService } from "./services/acomodacaoService.js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false })
  .then(async () => {
    const acomodacoes = await acomodacaoRepository.findAll();

    if (acomodacoes.length === 0) {
      console.log("Banco de dados vazio, populando acomodações...");

      try {
        await acomodacaoService.create("Solteiro Simples");
        await acomodacaoService.create("Solteiro Mais");
        await acomodacaoService.create("Casal Simples");
        await acomodacaoService.create("Família Simples");
        await acomodacaoService.create("Família Mais");
        await acomodacaoService.create("Família Super");

        console.log("Acomodações criadas com sucesso usando o Padrão Builder.");
      } catch (error) {
        console.error("Erro ao popular acomodações:", error);
      }
    }

    console.log("Database synchronized");
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
