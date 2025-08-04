const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3333;

// Configuração de CORS para permitir acesso de qualquer origem
server.use(cors());
server.use(middlewares);

// Servir arquivos estáticos da pasta public/files
server.use('/files', jsonServer.defaults.static(path.join(__dirname, 'public/files')));

// Adiciona um delay para simular uma API real
server.use((req, res, next) => {
  setTimeout(next, 300);
});

// Rotas personalizadas
server.get('/dashboard', (req, res) => {
  const db = router.db.getState();
  const income = db.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expense = db.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  res.json({
    balance: income - expense,
    income,
    expense,
    transactions: db.transactions.slice(0, 5)
  });
});

// Usa o router padrão do json-server
server.use(router);

// Inicia o servidor
server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});