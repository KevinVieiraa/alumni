const express = require('express');
const router = express.Router();
const disciplinaAlunoController = require('../controllers/DisciplinaAlunoController');

router.get('/listaDisciplinasPeriodo', async (req, res) => {
    const query = req.query;

    try {
        let result = await disciplinaAlunoController.listaDisciplinasPeriodo(query.id_aluno, query.periodo);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});

router.get('/listaDisciplinasAluno', async (req, res) => {
    const query = req.query;

    try {
        let result = await disciplinaAlunoController.listaDisciplinasAluno(query.id_aluno);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});

router.get('/infoDisciplinaAluno', async (req, res) => {
    const query = req.query;

    try {
        let result = await disciplinaAlunoController.alunoDisciplina(query.id_aluno, query.codDisciplina);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});

router.patch('/statusDisciplinaAluno', async (req, res) => {
    const query = req.query;

    try {
        let result = await disciplinaAlunoController.updateStatusDisciplina(query.id_aluno, query.id_disciplina, query.status);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});

router.patch('/listStatusDisciplinaAluno', async (req, res) => {
    const query = req.query;
    let listIdDisciplina = query.id_disciplina.split(',')
    let listStatus = query.status.split(',')
    const listResult = []

    try {
        for (let i = 0; i < listIdDisciplina.length; i++) {
            listResult[i] = await disciplinaAlunoController.updateStatusDisciplina(query.id_aluno, listIdDisciplina[i], listStatus[i]);
          }
        let result = {"disciplinas":listResult}
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});


module.exports = router;