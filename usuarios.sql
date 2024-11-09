CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,        -- Coluna de ID, com incremento automático
    email VARCHAR(255) UNIQUE NOT NULL,  -- E-mail do usuário (único e não nulo)
    senha VARCHAR(255) NOT NULL,   -- Senha do usuário (armazena a senha em texto criptografado)
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data e hora de criação (valor padrão: agora)
);
