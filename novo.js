app.post('/produto', (req, res) => {
    const produtoBody = req.body;

    // Incrementando o id (supondo que id seja gerado em uma variável separada no seu mock)
    id++; 

    const nome = produtoBody.nome;
    const preco = produtoBody.preco;

    const produto = {
        id,
        nome,
        preco
    };

    // SQL de inserção - você deve passar os valores 'nome' e 'preco'
    const sql = 'INSERT INTO produtos (nome, preco) VALUES ($1, $2)';

    // Executando a query no banco de dados
    pool.query(sql, [nome, preco], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server error');  // Apenas retorna uma resposta de erro
        }

        // Agora que o produto foi inserido no banco, adicione ao mock de produtos
        produtos.push(produto); // Supondo que 'produtos' seja um array mock

        console.log(produto);

        // Envia a resposta de sucesso após a inserção no banco e no mock
        return res.status(201).json({ produto });
    });
});