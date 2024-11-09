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
      // Manipulação manual da string no formato x-www-form-urlencoded
      const parsedData = parseUrlEncodedData(body);

      // Exibe os dados no console
      console.log('Dados recebidos:', parsedData);
      console.log(`E-mail: ${parsedData.email}`);
      console.log(`Senha: ${parsedData.senha}`);

      // Envia uma resposta ao cliente
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Dados recebidos e processados com sucesso!');
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

// Função para manipular a string "application/x-www-form-urlencoded"
function parseUrlEncodedData(data) {
  const result = {};
  
  // Divida a string em pares chave=valor
  const pairs = data.split('&');
  
  // Para cada par chave=valor
  pairs.forEach(pair => {
    // Divide o par em chave e valor
    const [key, value] = pair.split('=');

    // Decodifica os valores para lidar com caracteres especiais
    result[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return result;
}

// Define a porta em que o servidor vai escutar
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
