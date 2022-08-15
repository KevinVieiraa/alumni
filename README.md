# Plataforma Alumni

![](https://i.imgur.com/ooyUhZC.png)

A Alumni é uma plataforma direcionada para os estudantes do curso de Ciência da Computação para administrar o andamento da graduação. O objetivo é fornecer ao aluno uma plataforma dinâmica que permita um gerenciamento das matérias, horas e atividades ao longo do curso.


## Instalação

>Instale o Docker para [Windows](https://docs.docker.com/desktop/install/windows-install/) ou [Linux](https://docs.docker.com/engine/install/ubuntu/).

>Instale o [Docker-Compose](https://docs.docker.com/compose/install/).

## Execução
Clone o respositório para um local de sua preferência;

```sh
cd alumni/
```

Para iniciar o servidor de backend e o banco de dados:
```sh
docker-compose up --build
```

Para iniciar o servidor de frontend:
```sh
cd frontend/
docker-compose up --build
```


## Desenvolvedores

Débora Rosário Ghiotti – debora.ghiotti@edu.ufes.br

Luísa Saldanha Rios - luisa.rios@edu.ufes.br

Kevin Vieira Izabel - kevin.izabel@edu.ufes.br

## Projeto

### Front-end
O front-end da plataforma foi feito utilizando a biblioteca [React](https://pt-br.reactjs.org/) do JavaScript. Para acessar a plataforma é só utilizar o link [localhost:3000](localhost:3000).
Para desenvolver o front-end, foi feito um protótipo da plataforma Alumni na ferramenta [Figma](https://www.figma.com/).

Figma: [Prótotipo Alumni](https://www.figma.com/file/gb4Sti3DMp3bERUaeKg1gp/Prot%C3%B3tipo-Alumni?node-id=0%3A1)

### Banco de dados
O banco de dados escolhido para armazenar os dados da plataforma foi o [PostgreSQL](https://www.postgresql.org/).

#### Dados Armazenados
A plataforma armazena as seguintes informações:
* Aluno: Nome, Email, Senha, Curso, Disciplinas Cursadas, Disciplinas Pendentes, Disciplinas em Andamento e Disciplinas Optativas.
* Curso: Nome do Curso e Disciplinas do Curso
* Disciplina: Código, Nome, Período, Créditos, Carga Horária, Pré-requisitos e Obrigatória
* Atividades do Aluno: Nome, Categoria, Local, Data Início, Data Fim e Número de Horas
* Anotações do Alunos


#### Modelagem do Banco
Para armazenar os dados abaixo, foi feita a seguinte modelagem do banco de dados.
![](https://i.imgur.com/WZN9gnr.png)

### API
A API, que faz a comunicação entre o Front-end e o banco de dados, foi feita em NodeJS. A documentação dos Endpoints da API foi feita usando [Swagger](https://swagger.io/docs/open-source-tools/swagger-editor/). É possível acessá-la pelo link [localhost:3001/doc](localhost:3001/doc).

## Usabilidade
Detalhes sobre como a plataforma pode ser utilizada estão melhor descritos no [vídeo de apresentação](https://youtu.be/dPpiIuSqo9U).