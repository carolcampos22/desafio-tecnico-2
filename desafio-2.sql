-- Active: 1701175399230@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    telefone_numero TEXT NOT NULL,
    telefone_ddd TEXT NOT NULL,
    data_criacao TEXT DEFAULT(DATETIME()) NOT NULL,
    data_atualizacao TEXT DEFAULT(DATETIME()) NOT NULL,
    ultimo_login TEXT
);

