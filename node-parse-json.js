const http = require('http');

// Cria o servidor HTTP
const server = http.createServer((req, res) => {
  // Verifica se é uma requisição POST
  if (req.method === 'POST') {
    let body = '';

    // Escuta os dados da requisição
    req.on('data', chunk => {
      body += chunk;
    });

    // Quando todos os dados forem recebidos
    req.on('end', () => {
      // Faz o parsing manual da string JSON
      try {
        const parsedData = parseJSON(body);

        // Exibe os dados no console
        console.log('Dados recebidos:', parsedData);
        console.log(`Nome: ${parsedData.nome}`);
        console.log(`Idade: ${parsedData.idade}`);
        console.log(`Cidade: ${parsedData.cidade}`);

        // Envia uma resposta ao cliente
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('JSON recebido e processado com sucesso!');
      } catch (err) {
        // Caso o JSON esteja malformado
        console.error('Erro ao parsear o JSON:', err);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Erro ao processar JSON!');
      }
    });

    // Caso ocorra algum erro durante o processo
    req.on('error', (err) => {
      console.error('Erro ao processar a requisição:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro no servidor!');
    });
  } else {
    // Caso a requisição não seja um POST, envia um erro
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Método não permitido');
  }
});

// Função para fazer o parsing manual do JSON
function parseJSON(data) {
  // Remover espaços extras antes e depois da string
  data = data.trim();

  // Verificar se a string começa com '{' e termina com '}'
  if (data[0] !== '{' || data[data.length - 1] !== '}') {
    throw new Error('JSON malformado');
  }

  // Remover as chaves de abertura e fechamento
  data = data.slice(1, -1).trim();

  const result = {};
  let key = '';
  let value = '';
  let inString = false;  // Indica se estamos dentro de uma string (para lidar com aspas)
  let escape = false;    // Lida com o caractere de escape (\)
  let insideKey = true;  // Para controlar se estamos processando a chave ou o valor

  // Percorrer cada caractere da string para construir o objeto
  for (let i = 0; i < data.length; i++) {
    const char = data[i];

    if (escape) {
      // Se o caractere for precedido por uma barra invertida (\), adicionamos o caractere especial
      if (inString) {
        value += char;
      } else {
        key += char;
      }
      escape = false;
      continue;
    }

    // Se encontramos uma barra invertida (\), isso indica que o próximo caractere deve ser tratado como literal
    if (char === '\\') {
      escape = true;
      continue;
    }

    // Se encontramos uma aspas (") e estamos dentro de uma string, alternamos o estado de inString
    if (char === '"') {
      inString = !inString;
      continue;
    }

    // Se estamos dentro de uma chave ou valor (não dentro de uma string)
    if (!inString) {
      if (insideKey) {
        // Se encontramos um caractere de dois-pontos ":", isso significa que a chave acabou
        if (char === ':') {
          insideKey = false;
        } else if (char !== ' ' && char !== ',') {
          // Adiciona caracteres à chave
          key += char;
        }
      } else {
        // Se encontramos uma vírgula ou um fechamento de chave "}", isso significa que o valor acabou
        if (char === ',' || char === '}') {
          result[key.trim()] = value.trim(); // Adiciona o par chave-valor ao objeto
          key = '';
          value = '';
          insideKey = true;

          // Se for o fechamento de chave, paramos
          if (char === '}') {
            break;
          }
        } else {
          // Adiciona caracteres ao valor
          value += char;
        }
      }
    }
  }

  return result;
}

// Define a porta em que o servidor vai escutar
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
