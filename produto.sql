CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,         -- Coluna id auto-incremento para identificar cada produto
    nome VARCHAR(255) NOT NULL,    -- Coluna nome do produto (máximo de 255 caracteres e não pode ser nula)
    preco NUMERIC(10, 2) NOT NULL  -- Coluna preço do produto (com 10 dígitos no total e 2 casas decimais, não pode ser nula)
);
