const express = require('express');
const app = express();
app.use(express.json());

// 1. CARREGAR VARIÁVEIS DE AMBIENTE
try {
    require('dotenv').config();
} catch (e) {
    // Silencioso para produção
}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

// 2. VERIFICAÇÃO DO TOKEN (Para debug)
if (!HUBSPOT_TOKEN) {
    console.log("⚠️ Aviso: Variável HUBSPOT_ACCESS_TOKEN não encontrada no Render.");
} else {
    console.log("✅ Token do HubSpot carregado com sucesso!");
}

// 3. SUA ROTA DE TESTE (Para ver se o site está vivo)
app.get('/', (req, res) => {
    res.send('Bot WandersonWeb está online!');
});

// 4. SUA ROTA DO WEBHOOK (Onde o Twilio envia as mensagens)
app.post('/webhook', (req, res) => {
    console.log("Mensagem recebida do WhatsApp:", req.body);
    res.status(200).send('OK');
});

// 5. INICIALIZAÇÃO DO SERVIDOR (O segredo da porta)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});