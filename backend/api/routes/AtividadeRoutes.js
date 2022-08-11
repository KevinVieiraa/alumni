const express = require('express');
const router  = express.Router(); 
const atividadeController = require('../controllers/AtividadeController'); 


router.get('/', async(req, res) => {
    const query = req.query;
    try{
        let result = await atividadeController.getAtividade(query.id_aluno, query.categoria);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações."
        })
    }
})

router.post('/criarAtividade', async (req, res) => {
    const query = req.query;
    try{
        let result = await atividadeController.criarAtividade(query.titulo, query.categoria, query.local, query.carga_horaria, query.data_inicio, query.data_fim, query.id_aluno);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": error.toString()
        });
    }
});

router.delete('/deleteAtividade', async (req, res) => {
    const query = req.query;
    try{
        let result = await atividadeController.deleteAtividade(query.id_atividade, query.id_aluno);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).json({
            "message": error.toString()
        });
    }
});


module.exports = router; 
