const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

//importação das rotas
const AnotacaoRoute = require('./routes/AnotacaoRoute')
const AtividadeRoute = require('./routes/AtividadeRoute')
const AbaSimulacaoRoute = require('./routes/AbaSimulacaoRoute')
const DisciplinaSimuladaRoute = require('./routes/DisciplinaSimuladaRoute')

//parser das informações do request
app.use(express.urlencoded({ extended: true }));

//tratar o CORS
app.use(cors());

//parser das informações de um POST
app.use(express.json());

//utilização das rotas
app.use('/Anotacao', AnotacaoRoute);
app.use('/Atividade', AtividadeRoute);
app.use('/AbaSimulacao', AbaSimulacaoRoute);
app.use('/DisciplinaSimulada', DisciplinaSimuladaRoute);

//Rotas
const AlunoRoutes = require('./routes/AlunoRoutes');
const DisciplinaAlunoRoutes = require('./routes/DisciplinaAlunoRoutes');
const CursoRoutes = require('./routes/CursoRoutes');

//Parser das informações do request
app.use(express.urlencoded({ extended: true }));

//Tratar o CORS
app.use(cors());

//Parser das informações de um POST
app.use(express.json());

//Rota de batalhas
app.use('/aluno', AlunoRoutes);
app.use('/disciplinaAluno', DisciplinaAlunoRoutes);
app.use('/curso', CursoRoutes);

//Retorno de rotas inválidas
app.use(function(req, res, next) {
    res.status(404).json({
        "message": "Requisição inválida. Consulte a documentação para uma utilização adequada"
    });
});

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
})