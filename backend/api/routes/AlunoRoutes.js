const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/AlunoController');

router.get('/', async (req, res) => {
    const query = req.query;

    try {
        let result = await alunoController.autenticacaoAluno(query.email, query.senha);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(422).json({
            "message": error.toString()
        })
    }
});

router.post('/criarAluno', async (req, res) => {

    const query = req.query;

    try{
        let result = await alunoController.criarAluno(query.nome, query.email, query.senha, query.id_curso);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(422).json({
            "message": error.toString()
        });
    }
});

module.exports = router;