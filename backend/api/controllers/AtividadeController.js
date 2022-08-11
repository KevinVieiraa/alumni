const request = require('request');
const pool = require('../db.js');

//Acesso às atividades do aluno de acordo com a categoria
async function getAtividade (id_aluno, categoria) {
    let query = `SELECT * FROM Atividade WHERE id_aluno = ${id_aluno} AND categoria ='${categoria}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

//Criação de uma nova atividade para um aluno
async function criarAtividade (titulo, categoria, local, carga_horaria, data_inicio, data_fim, id_aluno) {
    let query = `INSERT INTO Atividade(titulo, categoria, local, carga_horaria, data_inicio, data_fim, id_aluno) VALUES ('${titulo}', '${categoria}', '${local}', ${carga_horaria}, '${data_inicio}', '${data_fim}', ${id_aluno})`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};

//Deleção a atividade de um aluno
async function deleteAtividade (id_aluno, id_atividade) {
    let query = `DELETE FROM Atividade WHERE id_aluno = ${id_aluno} AND id_atividade = ${id_atividade}`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows;

    return result;
};


module.exports = {getAtividade, criarAtividade, deleteAtividade};