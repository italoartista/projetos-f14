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

const produtos = [];  // mock do banco 


//     const { email, senha } = req.body;
    
//     const sql = 'INSERT INTO usuarios (email, senha, data_criacao) VALUES ( $1, $2, NOW() )';

//     pool.query(sql, [email, senha], (err, result) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Server error');
//             return;
//         }
//         res.status(201).send('User registered successfully');
//     });

//     res.status(200).json({email, senha});
// });

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
});

app.listen(3000, () =>  console.log('listening on port  3000'));

// app.post('/registro', (req, res) => { 