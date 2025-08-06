const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3334;

// Configurar CORS
app.use(cors());

// Garantir que a pasta temp/uploads existe
const uploadDir = path.join(__dirname, 'temp', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9.-]/g, '_'); // Remove caracteres especiais
    cb(null, `${timestamp}_${name}${extension}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

// Rota para upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  
  res.json({ 
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// Servir arquivos estáticos
app.use('/files', express.static(uploadDir, {
  setHeaders: (res, path) => {
    // Permitir CORS para arquivos
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// Rota para deletar arquivo
app.delete('/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'Arquivo deletado com sucesso' });
  } else {
    res.status(404).json({ error: 'Arquivo não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de upload rodando na porta ${PORT}`);
  console.log(`Arquivos salvos em: ${uploadDir}`);
});