const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

//importação das rotas
const AnotacaoRoute = require('./routes/AnotacaoRoutes')
const AtividadeRoute = require('./routes/AtividadeRoutes')
const AbaSimulacaoRoute = require('./routes/AbaSimulacaoRoutes')
const DisciplinaSimuladaRoute = require('./routes/DisciplinaSimuladaRoutes')
const AlunoRoutes = require('./routes/AlunoRoutes');
const DisciplinaAlunoRoutes = require('./routes/DisciplinaAlunoRoutes');
const CursoRoutes = require('./routes/CursoRoutes');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//parser das informações do request
app.use(express.urlencoded({ extended: true }));

//tratar o CORS
app.use(cors());

//parser das informações de um POST
app.use(express.json());

//utilização das rotas
app.use('/aluno', AlunoRoutes);
app.use('/disciplinaAluno', DisciplinaAlunoRoutes);
app.use('/curso', CursoRoutes);
app.use('/anotacao', AnotacaoRoute);
app.use('/atividade', AtividadeRoute);
app.use('/abaSimulacao', AbaSimulacaoRoute);
app.use('/disciplinaSimulada', DisciplinaSimuladaRoute);

//Parser das informações do request
app.use(express.urlencoded({ extended: true }));

//Tratar o CORS
app.use(cors());

//Parser das informações de um POST
app.use(express.json());

//Retorno de rotas inválidas
app.use(function(req, res, next) {
    res.status(404).json({
        "message": "Requisição inválida. Consulte a documentação para uma utilização adequada"
    });
});

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
})