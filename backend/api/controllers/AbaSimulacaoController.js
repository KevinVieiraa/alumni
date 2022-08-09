const request = require('request');
const pool = require('../db.js');

async function getAbaSimulacao (id_aluno) {
    let query = `SELECT * FROM AbaSimulacao WHERE id_aluno = ${id_aluno}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function criarAbaSimulacao (id_aluno, nome_aba) {
    let query = `INSERT INTO AbaSimulacao(id_aluno, nome_aba) VALUES (${id_aluno},'${nome_aba}')`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function deleteAbaSimulacao (id_aluno, id_aba) {
    let query = `DELETE FROM AbaSimulacao WHERE id_aluno = ${id_aluno} AND id_aba = ${id_aba}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};


module.exports = {getAbaSimulacao, criarAbaSimulacao, deleteAbaSimulacao};