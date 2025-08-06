const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3333;

server.use(middlewares);
server.use(cors())

// Adiciona um delay
server.use((req, res, next) => {
  setTimeout(next, 300);
});

// Usa o router padrão
server.use(router);

// Inicia o servidor
server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});
