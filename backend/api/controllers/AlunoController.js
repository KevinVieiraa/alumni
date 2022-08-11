const request = require('request');
const pool = require('../db.js');
const bcrypt = require('bcrypt');

//Autenticação do aluno na base de dados
async function autenticacaoAluno(email, senha) {
    let query = `SELECT nome, email, id_aluno, id_curso, senha FROM Aluno where email='${email}'`;
    let queryResult = await pool.query(query);
    let result = queryResult.rows[0];

    if(!result) {
        throw "Usuário não encontrado";
    }

    const passwordMatch = await bcrypt.compare(senha, result.senha);

    if(!passwordMatch) {
        throw "Senha incorreta";
    }

    return ({
        nome: result.nome,
        email: result.email,
        id_aluno: result.id_aluno,
        id_curso: result.id_curso
    });
}

//Criação de um novo aluno
async function criarAluno(nome, email, senha, id_curso) {
    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    let queryAluno = `SELECT email FROM Aluno where email='${email}'`;
    let queryAlunoResult = await pool.query(queryAluno);
    
    if(queryAlunoResult.rows.length > 0) {
        throw "Já existe um usuário cadastrado com esse email.";
    }

    let query = `INSERT INTO Aluno (nome, email, senha, id_curso) VALUES ('${nome}','${email}','${senhaHash}',${id_curso}) RETURNING nome,email,id_aluno,id_curso;`;
    let queryResult = await pool.query(query);

    let id_aluno = queryResult.rows[0].id_aluno;
    let queryResult2 = await criarDisciplinasAluno(id_aluno,id_curso);
    let queryResult3 = await criarAnotacao(id_aluno);

    let result = queryResult.rows[0];

    return result;
}

//Criação das disciplinas do aluno
async function criarDisciplinasAluno(id_aluno, id_curso) {
    let query = `SELECT id_disciplina from Disciplina where id_curso=${id_curso};`;
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

//Criação da anotação do aluno
async function criarAnotacao(id_aluno){
    let query = `INSERT INTO Anotacao (id_aluno, texto_anotacao) VALUES (${id_aluno},' ');`
    let queryResult = await pool.query(query);
    let result = {"message":"Anotacao criada com sucesso!"}
    return result
}


module.exports = {autenticacaoAluno,criarAluno, criarDisciplinasAluno};