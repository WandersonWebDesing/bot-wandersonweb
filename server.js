const express = require('express');
const app = express();

// 1. CONFIGURAÇÃO DE PARSERS (Essencial para ler o Twilio e JSON)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CARREGAR VARIÁVEIS DE AMBIENTE
try {
    require('dotenv').config();
} catch (e) {
    // Silencioso para produção no Render
}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

// 3. VERIFICAÇÃO DO TOKEN
if (!HUBSPOT_TOKEN) {
    console.log("⚠️ Aviso: Variável HUBSPOT_ACCESS_TOKEN não encontrada no Render.");
} else {
    console.log("✅ Token do HubSpot carregado com sucesso!");
}

// 4. ROTA DE TESTE (Para confirmar que o bot está vivo no navegador)
app.get('/', (req, res) => {
    res.send('<h1>Bot WandersonWeb Online</h1><p>O servidor está rodando corretamente.</p>');
});

// 5. ROTA DO WEBHOOK (Onde o Twilio entrega as mensagens)
app.post('/webhook', (req, res) => {
    // Agora o req.body virá preenchido com os dados do WhatsApp
    console.log("📱 Mensagem recebida do WhatsApp:", req.body);
    
    // Resposta padrão exigida pelo Twilio (Status 200)
    res.status(200).send('<Response></Response>');
});

// 6. INICIALIZAÇÃO DO SERVIDOR (Configuração exata para o Render)
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
    console.log(`🔗 Webhook configurado: https://bot-wandersonweb.onrender.com/webhook`);
});