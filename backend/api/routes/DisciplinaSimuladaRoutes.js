const express = require('express');
const router  = express.Router(); 
const discplinaSimuladaController = require('../controllers/DisciplinaSimuladaController'); 


router.get('/', async(req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await discplinaSimuladaController.getDisciplinaSimulada(query.id_aluno, query.id_aba);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações."
        })
    }
})

router.post('/criarDisciplinaSimulada', async (req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await discplinaSimuladaController.criarDisciplinaSimulada(query.id_aba, query.id_disciplina);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": error.toString()
        });
    }
});

router.delete('/deleteDisciplinaSimulada', async (req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await discplinaSimuladaController.deleteDisciplinaSimulada(query.id_aba, query.id_disciplina_simulada);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).json({
            "message": error.toString()
        });
    }
});


module.exports = router; 