const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

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