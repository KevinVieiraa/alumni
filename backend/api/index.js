const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

//importação das rotas
const AnotacaoRoute = require('./routes/AnotacaoRoute')
const AtividadeRoute = require('./routes/AtividadeRoute')

//parser das informações do request
app.use(express.urlencoded({ extended: true }));

//tratar o CORS
app.use(cors());

//parser das informações de um POST
app.use(express.json());

//utilização das rotas
app.use('/Anotacao', AnotacaoRoute);
app.use('/Atividade', AtividadeRoute);

//Retorno de rotas inválidas
app.use(function(req, res, next) {
    res.status(404).json({
        "message": "Requisição inválida. Consulte a documentação para uma utilização adequada"
    });
});

//listener
app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
})