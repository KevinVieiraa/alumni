const request = require('request');
const pool = require('../db.js');

//Caso o parametro id tenha sido passado, retorna uma batalha com o id específico, do contrário, retorna todas as batalhas
async function autenticacaoAluno(email, senha) {
    let query = `SELECT nome, email, id_aluno, id_curso FROM Aluno where email='${email}' and senha='${senha}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    return result;
}

async function criarAluno(nome, email, senha, id_curso) {
    let query = `INSERT INTO Aluno (nome, email, senha, id_curso) VALUES ('${nome}','${email}','${senha}',${id_curso}) RETURNING id_aluno;`;
    let queryResult = await pool.query(query);

    let id_aluno = queryResult.rows[0].id_aluno;
    let queryResult2 = await criarDisciplinasAluno(id_aluno,id_curso);
    let queryResult3 = await criarAnotacao(id_aluno);

    let result = queryResult;

    return result;
}

async function criarDisciplinasAluno(id_aluno, id_curso) {
    let query = `SELECT id_disciplina from Disciplina where id_curso=${id_curso} and obrigatoria=TRUE;`;
    let queryResult = await pool.query(query);
    let lista_disciplinas = queryResult.rows;

    for (let i = 0; i < queryResult.rowCount; i++) {
        let id_disciplina = lista_disciplinas[i].id_disciplina;
        let queryDisciplina = `INSERT INTO DisciplinaAluno (status, id_aluno, id_disciplina) VALUES ('Pendente',${id_aluno},${id_disciplina});`;
        let queryDisciplinaResult = await pool.query(queryDisciplina);
      }
    let queryDisciplinaAluno = `SELECT * from DisciplinaAluno where id_aluno=${id_aluno};`;
    let queryDisciplinaAlunoResult = await pool.query(queryDisciplinaAluno);
    let result = {"resultado": queryDisciplinaAlunoResult.rows};

    return result;
}


async function criarAnotacao(id_aluno){
    let query = `INSERT INTO Anotacao (id_aluno, texto_anotacao) VALUES (${id_aluno},' ');`
    let queryResult = await pool.query(query);
    let result = {"message":"Anotacao criada com sucesso!"}
    return result
}


module.exports = {autenticacaoAluno,criarAluno, criarDisciplinasAluno};