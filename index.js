const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'admin',
    port: 5432,
});




app.use(express.json());  // parse do json 


let id = 0;

const produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 5000 },
    { id: 2, nome: "Smartphone", preco: 2000 },
    { id: 3, nome: "Tablet", preco: 1500 },
    { id: 4, nome: "Monitor", preco: 800 },
    { id: 5, nome: "Teclado Mecânico", preco: 300 }
];  // mock do banco




app.get('/ab?cd', (req, res) => {
    res.send('ab+cd')
  })
app.get('/api/produto', (req, res) => { 
    res.status(200).json(produtos)
})

app.get('/api/produto/:id', (req, res) => { 
    const { id }  = req.params 
    const produto = produtos[id-1]
    
    console.log(produto)

    if(produto)
        res.status(200).json(produto)
    else 
        res.status(404).send("Produto não existe.")

})


app.put('/api/produto/:id', (req, res) => { 
    const { nome, preco  } = req.body; 
    const { id } = req.params

    const produto = { 
        id,
        nome, 
        preco
    }


    
    if(produtos[id-1]) {
        produtos[id-1] = produto 
        res.status(200).json({msg: "Produto foi atualizado", produto})

    } else { 
        res.status(404).send('Não existe produto para ser atualizado')
    } 
        

    

})


app.post('/registro', (req, res) => { 
    const { email, senha } = req.body;
    
    // const sql = 'INSERT INTO usuarios (email, senha, data_criacao) VALUES ( $1, $2, NOW() )';

    // pool.query(sql, [email, senha], (err, result) => {
    //     if (err) {
    //         console.error(err.message);
    //         res.status(500).send('Server error');
    //         return;
    //     }
    //     res.status(201).send('User registered successfully');
    // });

    res.status(200).json({email, senha});
});

app.post('/produto', (req, res) => {
    const produtoBody = req.body // retorna um objeto

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
});

app.listen(3000, () =>  console.log('listening on port  3000'));

