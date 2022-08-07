const express = require('express');
const router  = express.Router(); 
const abaSimulacaoController = require('../controllers/AbaSimulacaoController'); 


router.get('/', async(req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await abaSimulacaoController.getAbaSimulacao(query.id_aluno);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações."
        })
    }
})

router.post('/criarAbaSimulacao', async (req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await abaSimulacaoController.criarAbaSimulacao(query.id_aluno, query.nome_aba);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": error.toString()
        });
    }
});

router.delete('/deleteAbaSimulacao', async (req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await abaSimulacaoController.deleteAbaSimulacao(query.id_aba, query.id_aluno);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).json({
            "message": error.toString()
        });
    }
});


module.exports = router; 