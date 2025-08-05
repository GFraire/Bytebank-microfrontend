const jsonServer = require('json-server');
const express = require('express'); // necessário para arquivos estáticos
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3333;

server.use(middlewares);

server.use('/files', express.static(path.join(__dirname, 'public/files')));

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
