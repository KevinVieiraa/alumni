DROP TABLE IF EXISTS Aluno;
CREATE TABLE Aluno(
    id_aluno serial PRIMARY KEY,
    nome VARCHAR(200),
    email VARCHAR(200) UNIQUE,
    senha VARCHAR(512),
    id_curso INT
);

DROP TABLE IF EXISTS Atividade;
CREATE TABLE Atividade(
    id_atividade serial PRIMARY KEY,
    titulo VARCHAR(200),
    categoria VARCHAR(200),
    local VARCHAR(200),
    carga_horaria INT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    id_aluno INT
);

DROP TABLE IF EXISTS AbaSimulacao;
CREATE TABLE AbaSimulacao(
    id_aba serial PRIMARY KEY,
    nome_aba VARCHAR(30),
    id_aluno INT
);

DROP TABLE IF EXISTS Anotacao;
CREATE TABLE Anotacao(
    id_anotacao serial PRIMARY KEY,
    texto_anotacao VARCHAR(2048),
    id_aluno INT
);

DROP TABLE IF EXISTS Curso;
CREATE TABLE Curso(
    id_curso serial PRIMARY KEY,
    nome_curso VARCHAR(200)
);

DROP TABLE IF EXISTS DisciplinaSimulada;
CREATE TABLE DisciplinaSimulada(
    id_disciplina_simulada serial PRIMARY KEY,
    id_disciplina INT,
    id_aba INT
);

DROP TABLE IF EXISTS Disciplina;
CREATE TABLE Disciplina(
    id_disciplina serial PRIMARY KEY,
    codigo VARCHAR(12),
    nome_disciplina VARCHAR(200),
    periodo INT,
    creditos INT,
    carga_horaria INT,
    obrigatoria BOOLEAN,
    id_curso INT
);

DROP TABLE IF EXISTS DisciplinaAluno;
CREATE TABLE DisciplinaAluno(
    id_disciplina_aluno serial PRIMARY KEY,
    status VARCHAR(20),
    id_aluno INT,
    id_disciplina INT
);

DROP TABLE IF EXISTS PreRequisito;
CREATE TABLE PreRequisito(
    id_pre_requisito serial PRIMARY KEY,
    id_disciplina INT,
    id_disciplina_requisito INT
);

ALTER TABLE Aluno 
ADD CONSTRAINT constraint_aluno_curso
FOREIGN KEY (id_curso) 
REFERENCES Curso (id_curso);

ALTER TABLE Atividade
ADD CONSTRAINT constraint_atividade_aluno
FOREIGN KEY (id_aluno) 
REFERENCES Aluno (id_aluno);

ALTER TABLE AbaSimulacao
ADD CONSTRAINT constraint_aba_aluno
FOREIGN KEY (id_aluno) 
REFERENCES Aluno (id_aluno);

ALTER TABLE Anotacao
ADD CONSTRAINT constraint_anotacao_aluno
FOREIGN KEY (id_aluno) 
REFERENCES Aluno (id_aluno);

ALTER TABLE DisciplinaAluno
ADD CONSTRAINT constraint_disciplinaaluno_aluno
FOREIGN KEY (id_aluno) 
REFERENCES Aluno (id_aluno);

ALTER TABLE DisciplinaAluno
ADD CONSTRAINT constraint_disciplinaaluno_disciplina
FOREIGN KEY (id_disciplina) 
REFERENCES Disciplina (id_disciplina);

ALTER TABLE Disciplina
ADD CONSTRAINT constraint_disciplina_curso
FOREIGN KEY (id_curso) 
REFERENCES Curso (id_curso);

ALTER TABLE PreRequisito
ADD CONSTRAINT constraint_prerequisito_disciplina
FOREIGN KEY (id_disciplina) 
REFERENCES Disciplina (id_disciplina);

ALTER TABLE PreRequisito
ADD CONSTRAINT constraint_prerequisito_disciplinarequisito
FOREIGN KEY (id_disciplina_requisito) 
REFERENCES Disciplina (id_disciplina);

ALTER TABLE DisciplinaSimulada
ADD CONSTRAINT constraint_disciplinasimulada_disciplina
FOREIGN KEY (id_disciplina) 
REFERENCES Disciplina (id_disciplina);

ALTER TABLE DisciplinaSimulada
ADD CONSTRAINT constraint_disciplinasimulada_aba
FOREIGN KEY (id_aba) 
REFERENCES AbaSimulacao (id_aba);

INSERT INTO Curso (nome_curso)
VALUES ('Ciência da Computação');

INSERT INTO Disciplina (codigo, nome_disciplina,periodo,creditos,carga_horaria, obrigatoria, id_curso)
VALUES ('INF666','Projetao',8,6,500,TRUE,1), 
('INF777','Banco de Dados',7,4,60,TRUE,1);
