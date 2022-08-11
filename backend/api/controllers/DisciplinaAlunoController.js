const request = require('request');
const pool = require('../db.js');

//Listagem de todas as disciplinas do aluno de um determinado período.
async function listaDisciplinasPeriodo(id_aluno, periodo){

    let query = `SELECT T1.id_disciplina, T2.id_disciplina_aluno, T2.id_aluno, T1.id_curso, T1.codigo, T1.nome_disciplina, T1.periodo, T1.creditos, T1.carga_horaria, T1.obrigatoria, T2.status FROM Disciplina T1 INNER JOIN DisciplinaAluno T2 ON T1.id_disciplina = T2.id_disciplina WHERE T2.id_aluno = ${id_aluno} and T1.periodo=${periodo}`;
    let queryResult = await pool.query(query);
    let result = {"disciplinas" : queryResult.rows};
    return result;
}



async function listaDisciplinasAluno(id_aluno){

    let query = `SELECT T1.id_disciplina, T2.id_disciplina_aluno, T2.id_aluno, T1.id_curso, T1.codigo, T1.nome_disciplina, T1.periodo, T1.creditos, T1.carga_horaria, T1.obrigatoria, T2.status FROM Disciplina T1 INNER JOIN DisciplinaAluno T2 ON T1.id_disciplina = T2.id_disciplina WHERE T2.id_aluno = ${id_aluno}`;
    let queryResult = await pool.query(query);
    for (let i = 0; i < queryResult.rowCount; i++) {
        let id_disciplina = queryResult.rows[i].id_disciplina;
        let preRequisitos = await getPreRequisitos(id_disciplina);
        queryResult.rows[i].pre_requisitos = preRequisitos.map(requisto => requisto.codigo);
      }
    let result = {"disciplinas" : queryResult.rows};
     
    return result;
}

//Listagem dos PreRequisitos de uma disciplina
async function getPreRequisitos(id_disciplina){
    let query = `SELECT codigo FROM Disciplina WHERE id_disciplina IN (SELECT id_disciplina_requisito FROM PreRequisito WHERE id_disciplina=${id_disciplina});`;
    let queryResult = await pool.query(query);
    return queryResult.rows;
}

//Acesso às informações de uma determinada disciplina de um aluno.
async function infoDisciplinaAluno(id_aluno, codDisciplina){

    let query = `SELECT T1.id_disciplina, T2.id_disciplina_aluno, T2.id_aluno, T1.id_curso, T1.codigo, T1.nome_disciplina, T1.periodo, T1.creditos, T1.carga_horaria, T1.obrigatoria, T2.status FROM Disciplina T1 INNER JOIN DisciplinaAluno T2 ON T1.id_disciplina = T2.id_disciplina WHERE T2.id_aluno = ${id_aluno} and T1.codigo='${codDisciplina}'`;
    let queryResult = await pool.query(query);
    let result = {"disciplinas" : queryResult.rows};
    return result;
}

//Atualização do status de uma disciplina do aluno.
async function updateStatusDisciplina(id_aluno,id_disciplina,status){
    let query = `UPDATE DisciplinaAluno SET status='${status}' WHERE id_aluno=${id_aluno} and id_disciplina='${id_disciplina}';`
    let queryResult = await pool.query(query);
    let result = {"Status": "Disciplina atualizada com sucesso!"}
    return result;
}

module.exports = {listaDisciplinasPeriodo,listaDisciplinasAluno,infoDisciplinaAluno,updateStatusDisciplina,getPreRequisitos};