const request = require('request');
const pool = require('../db.js');

async function getDisciplinaSimulada (id_aluno, id_aba) {
    let query = `SELECT d.codigo, d.nome_disciplina, d.periodo, d.creditos, d.carga_horaria, pr.id_disciplina_requisito
                 FROM DisciplinaSimulada ds
                 INNER JOIN DisciplinaAluno da ON da.id_aluno = ${id_aluno}
                 AND da.id_disciplina = ds.id_disciplina
                 INNER JOIN Disciplina d ON d.id_disciplina = ds.id_disciplina
                 FULL OUTER JOIN PreRequisito pr ON pr.id_disciplina = d.id_disciplina
                 WHERE ds.id_aba = ${id_aba}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function criarDisciplinaSimulada (id_aba, id_disciplina) {
    let query = `INSERT INTO DisciplinaSimulada(id_aba, id_disciplina) VALUES (${id_aba},'${id_disciplina}')`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

async function deleteDisciplinaSimulada (id_aba, id_disciplina_simulada) {
    let query = `DELETE FROM DisciplinaSimulada WHERE id_aba = ${id_aba} AND id_disciplina_simulada = ${id_disciplina_simulada}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};


module.exports = {getDisciplinaSimulada, criarDisciplinaSimulada, deleteDisciplinaSimulada};