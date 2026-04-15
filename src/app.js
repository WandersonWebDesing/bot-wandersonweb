const express = require('express');
const app = express();

// IMPORTANTE: Permite que o servidor entenda JSON e dados de formulário
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Rota para o Render não dar "Not Found"
app.get('/', (req, res) => {
    res.status(200).send('🚀 API ONLINE');
});

module.exports = app;