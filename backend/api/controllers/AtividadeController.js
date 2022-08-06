const request = require('request');
const pool = require('../db.js');

async function getAtividade (id_aluno, categoria) {
    let query = `SELECT * FROM Atividade WHERE id_aluno = '${id_aluno}' AND categoria ='${categoria}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function criarAtividade (titulo, categoria, local, carga_horaria, data_inicio, data_fim, id_aluno) {
    let query = `INSERT INTO Atividade(titulo, categoria, local, carga_horaria, data_inicio, data_fim, id_aluno) VALUES ('${titulo}', '${categoria}', '${local}', '${carga_horaria}', '${data_inicio}', '${data_fim}', '${id_aluno}')`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};

async function deleteAtividade (id_aluno, id_atividade) {
    let query = `DELETE FROM Atividade WHERE id_aluno = '${id_aluno}' AND id_atividade = '${id_atividade}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};


module.exports = {getAtividade, criarAtividade, deleteAtividade};