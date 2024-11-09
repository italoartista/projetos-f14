app.post('/produto', (req, res) => {
    const produtoBody = req.body

    id++; 

    const nome = produtoBody.nome 
    const preco = produtoBody.preco 

    const produto =  {
        id, 
        nome, 
        preco
    }
    const sql = 'INSERT INTO produtos (nome, preco) VALUES ( $1, $2 )'
    pool.query(sql, [nome, preco], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server error');
            return;
        }
        res.status(201).send('Product added successfully');
    });
    produtos.push(produto);  // adiciona o produto ao mock do banco 
    console.log(produto)
    res.status(200).json({produto});

});