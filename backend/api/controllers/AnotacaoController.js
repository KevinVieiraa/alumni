const request = require('request');
const pool = require('../db.js');

//Acesso à anotação do aluno
async function getAnotacao (id_aluno) {
    let query = `SELECT texto_anotacao FROM Anotacao WHERE id_aluno = ${id_aluno}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

//Atualização do conteúdo da anotação do aluno
async function editarAnotacao (id_aluno,conteudo) {
    let query = `UPDATE Anotacao SET texto_anotacao = '${conteudo}' WHERE id_aluno = ${id_aluno}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};


module.exports = {getAnotacao, editarAnotacao};