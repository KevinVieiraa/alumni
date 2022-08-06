const request = require('request');
const pool = require('../db.js');

async function getAnotacao (idAluno) {
    let query = `SELECT texto_anotacao FROM Anotacao WHERE id_aluno = '${idAluno}'`
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};

async function editarAnotacao (idAluno,conteudo) {
    let query = `UPDATE Anotacao SET texto_anotacao = '${conteudo}' WHERE id_aluno = '${idAluno}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};


module.exports = {getAnotacao, editarAnotacao,};