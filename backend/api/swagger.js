const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/AlunoRoutes.js','./routes/CursoRoutes.js','./routes/AtividadeRoute.js','./routes/DisciplinaAlunoRoutes.js','./routes/DisciplinaSimuladaRoute.js','./routes/AbaSimulacaoRoute.js','./routes/AnotacaoRoute.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
});