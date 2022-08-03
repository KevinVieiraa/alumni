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
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações"
        })
    }
});

module.exports = router;