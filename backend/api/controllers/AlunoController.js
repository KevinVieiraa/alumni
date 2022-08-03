const request = require('request');
const pool = require('../db.js');

//Caso o parametro id tenha sido passado, retorna uma batalha com o id específico, do contrário, retorna todas as batalhas
async function autenticacaoAluno(email, senha) {
    let query = `SELECT nome, email, id_curso FROM Aluno where email='${email}' and senha='${senha}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
}


module.exports = {autenticacaoAluno};