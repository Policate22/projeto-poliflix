const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const conexao = mysql.createPool({
    database: "poliflix",
    host: "localhost",
    password: "",
    user: "root"
});


app.listen(3000, () => {

});

app.get("/filmes", async function(req, res) {
    var filme_procurado = req.query.filme;
    console.log(filme_procurado);

    var dados = await conexao.query("SELECT * FROM filmes WHERE titulo LIKE ?", ['%' + filme_procurado + '%']);
    
    res.json(dados[0]);
});

app.post('/login', async (req, res) =>{
    let usuario = req.body.usuario
    let senha = req.body.senha 
    let status = false
    const sql = `
    select * from usuarios 
    where email = ? and senha = ?
    `
    const [rows] = await conn.execute(sql, [usuario,senha])

    if(rows.length > 0)
    {
        status = true
    }
    res.send('usuário autenticado: ')
    

    
})