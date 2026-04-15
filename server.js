const express = require('express');
const app = express();

// 1. CONFIGURAÇÃO DE ENTRADA DE DADOS
// Permite que o servidor entenda JSON e o formato que o Twilio envia (urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. VARIÁVEIS DE AMBIENTE (HubSpot)
try {
    require('dotenv').config();
} catch (e) {
    // Silencioso para produção no Render
}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
console.log(HUBSPOT_TOKEN ? "✅ Token HubSpot: OK" : "⚠️ Token HubSpot: Ausente");

// 3. ROTA DE TESTE (Para abrir no navegador)
app.get('/', (req, res) => {
    res.send('Bot WandersonWeb está online e operante!');
});

// 4. WEBHOOK (Rapport e Resposta Automática)
app.post('/webhook', (req, res) => {
    const nomeCliente = req.body.ProfileName || 'parceiro';
    const mensagemCorpo = req.body.Body || '';
    
    console.log(`📱 Mensagem de ${nomeCliente}: ${mensagemCorpo}`);

    // Script Estratégico de Neurodesign
    const respostaPersuasiva = `Olá, ${nomeCliente}! Wanderson aqui. 👋

Recebi sua mensagem e já identifiquei que você busca elevar o nível do seu posicionamento digital. 

Muitos projetos falham não por falta de tecnologia, mas por falta de **Rapport** e **Neurodesign**. Hoje, um site que não converte é apenas um cartão de visitas caro. 

Para eu te entregar uma solução que realmente gere autoridade e feche negócios, me diga:
1️⃣ Qual o seu principal gargalo hoje (vendas, tráfego ou autoridade)?
2️⃣ O seu design atual comunica confiança ou afasta o seu cliente ideal?`;

    // Resposta em XML para o Twilio (Obrigatório para o WhatsApp responder)
    res.header('Content-Type', 'text/xml');
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${respostaPersuasiva}</Message>
</Response>`;

    res.status(200).send(twiml);
});

// 5. START DO SERVIDOR (Porta dinâmica do Render)
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});