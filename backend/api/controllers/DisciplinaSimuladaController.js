const request = require('request');
const pool = require('../db.js');

async function getDisciplinaSimulada (id_aluno, id_aba) {
    let query = `SELECT * FROM DisciplinaSimulada WHERE id_aluno = '${id_aluno}' AND id_aba = '${id_aba}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function criarDisciplinaSimulada (id_aba, id_disciplina) {
    let query = `INSERT INTO DisciplinaSimulada(id_aba, id_disciplina) VALUES ('${id_aba}','${id_disciplina}')`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};

async function deleteDisciplinaSimulada (id_aba, id_disciplina_simulada) {
    let query = `DELETE FROM DisciplinaSimulada WHERE id_aba = '${id_aba}' AND id_disciplina_simulada = '${id_disciplina_simulada}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
};


module.exports = {getDisciplinaSimulada, criarDisciplinaSimulada, deleteDisciplinaSimulada};