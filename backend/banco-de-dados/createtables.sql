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
VALUES ('Ciência da Computação - 2022');

INSERT INTO Disciplina (codigo, nome_disciplina, periodo,creditos,carga_horaria, obrigatoria, id_curso)
VALUES ('INF15927','Programação I',1,3,60,TRUE,1),
('INF16150','Aspectos Teóricos da Computação',1,4,60,TRUE,1),
('INF16151','Introdução à Ciência da Computação',1,3,60,TRUE,1),
('MAT15925','Cálculo I',1,6,90,TRUE,1),
('INF15973','Lógica para Computação I',2,4,60,TRUE,1),
('INF16152','Elementos de Lógica Digital',2,4,60,TRUE,1),
('INF16153','Programação II',2,3,60,TRUE,1),
('MAT15931','Cálculo II',2,4,60,TRUE,1),
('INF15974','Estruturas de Dados',3,3,60,TRUE,1),
('INF16154','Arquitetura e Organização de Computadores',3,3,60,TRUE,1),
('MAT15932','Álgebra Linear',3,4,60,TRUE,1),
('MAT15937','Cálculo IV',3,4,60,TRUE,1),
('STA15932','Probabilidade e Estatística',3,4,60,TRUE,1),
('INF15933','Programação Orientada a Objetos',4,3,60,TRUE,1),
('INF15975','Técnicas de Busca e Ordenação',4,3,60,TRUE,1),
('INF15980','Sistemas Operacionais',4,3,60,TRUE,1),
('INF16028','Teoria dos Grafos',4,4,60,TRUE,1),
('INF16155','Linguagens Formais e Autômatos',4,4,60,TRUE,1),
('INF15978','Engenharia de Software I',5,4,60,TRUE,1),
('INF16013','Lógica para Computação II',5,4,60,TRUE,1),
('INF16156','Algoritmos Numéricos',5,3,60,TRUE,1),
('INF16157','Projeto Integrado I',5,3,60,TRUE,1),
('INF16158','Redes de Computadores',5,3,60,TRUE,1),
('INF16159','Computação e Sociedade',6,2,60,TRUE,1),
('INF16160','Engenharia de Software II',6,4,60,TRUE,1),
('INF16161','Paradigmas de Programação',6,3,60,TRUE,1),
('INF16162','Teoria da Computação',6,4,60,TRUE,1),
('INF15979','Banco de Dados I',7,4,60,TRUE,1),
('INF16016','Inteligência Artificial',7,3,60,TRUE,1),
('INF16163','Compiladores',7,3,60,TRUE,1),
('INF16164','Projeto e Análise de Algoritmos',7,4,60,TRUE,1),
('INF16165','Metodologia de Pesquisa Científica',8,3,60,TRUE,1),
('ELE15983','Visão Computacional',99,4,60,FALSE,1),
('EPR13005','Gestão de Inovação e Empreendedorismo',99,4,60,FALSE,1),
('INF15976','Programação Web',99,3,60,FALSE,1),
('INF15977','Programação para Dispositivos Móveis',99,3,30,FALSE,1),
('INF15981','Introdução à Ciência de Dados',99,4,60,FALSE,1),
('INF15984','Programação Linear e Introdução à Otimização',99,4,60,FALSE,1),
('INF16014','Computação Gráfica',99,3,60,FALSE,1),
('INF16021','Processamento Paralelo',99,4,60,FALSE,1),
('INF16022','Segurança em Computação',99,3,60,FALSE,1),
('INF16023','Tópicos em Linguagens de Programação',99,4,60,FALSE,1),
('INF16024','Tópicos em Otimização',99,4,60,FALSE,1),
('INF16025','Tópicos em Sistemas Computacionais',99,4,60,FALSE,1),
('INF16026','Tópicos em Sistemas de Informação',99,3,45,FALSE,1),
('INF16027','Tópicos em Tecnologia e Inovação',99,4,60,FALSE,1),
('INF16166','Tópicos em Engenharia de Software',99,3,45,FALSE,1),
('INF16167','Tópicos em Modelagem Conceitual',99,3,45,FALSE,1),
('INF16168','Desenvolvimento Orientado a Modelos',99,3,45,FALSE,1),
('INF16169','Tópicos em Programação',99,4,60,FALSE,1),
('INF16170','Tópicos em Inteligência Computacional',99,4,60,FALSE,1),
('INF16171','Avaliação de Desempenho',99,4,60,FALSE,1),
('INF16172','Banco de Dados II',99,3,60,FALSE,1),
('INF16173','Computação Científica',99,3,60,FALSE,1),
('INF16174','Elementos Finitos',99,4,60,FALSE,1),
('INF16175','Empreendedorismo',99,4,60,FALSE,1),
('INF16176','Gerência de Projetos',99,4,60,FALSE,1),
('INF16177','Laboratório de Redes',99,2,60,FALSE,1),
('INF16178','Projeto Integrado II',99,3,60,FALSE,1),
('INF16179','Sistemas Distribuídos',99,3,60,FALSE,1),
('INF16180','Visão Computacional',99,4,60,FALSE,1),
('INF16181','Tópicos em Lógica para Computação',99,4,60,FALSE,1),
('INF16182','Processos Estocásticos',99,4,60,FALSE,1),
('INF16183','Interação Humano-Computador',99,3,60,FALSE,1),
('INF16184','Tópicos em Teoria da Computação',99,4,60,FALSE,1),
('INF16185','Projeto Integrado de Extensão',99,2,60,FALSE,1),
('LET16015','Fundamentos da Língua Brasileira de Sinais',99,4,60,FALSE,1);


INSERT INTO PreRequisito (id_disciplina, id_disciplina_requisito)
VALUES (6,2),
(6,3),
(7,1),
(8,4),
(9,7),
(10,6),
(11,4),
(12,8),
(13,4),
(14,9),
(15,9),
(16,9),
(16,10),
(17,9),
(18,5),
(18,2),
(19,14),
(20,5),
(21,7),
(21,8),
(21,11),
(22,14),
(23,16),
(24,14),
(25,19),
(26,14),
(27,9),
(27,18),
(28,15),
(29,20),
(29,13),
(30,15),
(30,18),
(30,26),
(31,15),
(31,17),
(32,13),
(32,14),
(33,11),
(33,14),
(34,19),
(35,14),
(36,35),
(37,13),
(37,14),
(38,7),
(38,8),
(38,11),
(39,11),
(39,14),
(40,16),
(41,14),
(41,23),
(42,26),
(43,15),
(44,23),
(45,19),
(46,26),
(47,19),
(48,19),
(49,19),
(50,9),
(51,29),
(52,63),
(53,28),
(54,21),
(55,21),
(56,19),
(57,19),
(58,23),
(59,28),
(59,25),
(59,64),
(60,23),
(61,14),
(61,11),
(62,5),
(63,13),
(64,19),
(65,27),
(66,14);


