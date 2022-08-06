const request = require('request');
const pool = require('../db.js');

async function getCursos() {
    let query = `SELECT id_curso, nome_curso FROM Curso;`;
    let queryResult = await pool.query(query);
    let result = {"cursos": queryResult.rows};
    return result;
}


module.exports = {getCursos};