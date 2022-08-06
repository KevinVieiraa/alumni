const express = require('express');
const router  = express.Router(); 
const anotacaoController = require('../controllers/AnotacaoController'); 


router.get('/', async(req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await anotacaoController.getAnotacao(query.idAluno);
        res.status(200).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": "Requisição inválida. Consulte a documentação da API para mais informações."
        })
    }
})

router.patch('/editarAnotacao', async (req, res) => {
    const query = req.query;
    console.log(query)
    try{
        let result = await anotacaoController.editarAnotacao(query.idAluno, query.conteudo);
        res.status(201).json(result);
    }
    catch(error) {
        res.status(400).json({
            "message": error.toString()
        });
    }
});


module.exports = router; 
