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

INSERT INTO users(id, nome, email, senha, telefone_numero, telefone_ddd)
VALUES
    ('u001', 'Maria', 'maria@email.com', '123456', '154236545', '11'),
    ('u002', 'João', 'j@email.com', '000000', '1542546844', '21'),
    ('u003', 'Ana', 'aninha@email.com', 'abc123', '114141412', '32');
