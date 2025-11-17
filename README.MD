# 🌊 Atlantis Water Park - Sistema de Gerenciamento V

> Atividade prática da disciplina de **Técnicas de Programação** (T5).
> **Foco:** Desenvolvimento Full-Stack (API REST e SPA) e Validação de Dados.
>
![Status](https://img.shields.io/badge/Status-Concluido-greenm) ![Node](https://img.shields.io/badge/Node.js-v18%2B-blue) ![React](https://img.shields.io/badge/React-v18-cyan) ![Stack](https://img.shields.io/badge/Stack-Full_Stack-purple)

## 📄 Sobre o Projeto

O **Atlantis V** é um sistema de gerenciamento full-stack para o parque aquático e resort. O projeto é estruturado como um monorepo contendo:

1.  **Backend:** Uma API RESTful construída com Node.js e Express, responsável pela lógica de negócios.
2.  **Frontend:** Uma **Single Page Application (SPA)** construída com React e Vite, fornecendo a interface de usuário.

O sistema utiliza **Zod** de ponta-a-ponta para garantir a consistência e validação de dados entre o frontend e o backend.

## 🎯 Funcionalidades Implementadas

O protótipo atual contempla os seguintes módulos de gerenciamento:

* **👥 Gestão de Clientes (Hóspedes):**
    * Cadastro, listagem, atualização e remoção de clientes titulares (CRUD).
    * Gerenciamento de dependentes vinculados a um titular.
* **🏨 Gestão de Acomodações:**
    * Cadastro e visualização dos quartos e suítes.
* **📅 Registro de Hospedagens:**
    * Sistema para realizar o check-in e controle de estadias (em breve).

## 🚀 Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Runtime:** Node.js  `v20.x`
* **Backend:** Express + `ts-node-dev`
* **Validação:** Zod
* **Front-end:** React + Vite
* **Estilização:** Tailwind CSS
* **Gerenciador de Pacotes:** NPM

## 💻 Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

1.  **Node.js:** Versão  `v20.x`.
2.  **NPM:** Geralmente instalado automaticamente com o Node.js.

## 📦 Instalação e Execução

O projeto é dividido em `backend` e `frontend`. Você precisará de **dois terminais** abertos para executar o projeto completo.

---

### 1. Backend (Terminal 1)

1.  Navegue até a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento (com hot-reload):
    ```bash
    npm run dev
    ```
    O backend estará rodando em `http://localhost:5000`.

---

### 2. Frontend (Terminal 2)

1.  Navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do Vite:
    ```bash
    npm run dev
    ```
4.  Abra seu navegador e acesse o endereço fornecido pelo Vite (geralmente `http://localhost:5173`).

---

## 👤 Autor
Giovanni Kanjiscuk - Estudante de Tecnologia - Técnicas de Programação

Desenvolvido como requisito avaliativo para a ATV - T5 Atlantis.