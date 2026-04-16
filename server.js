const express = require('express');
const { Client } = require('@hubspot/api-client');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 TESTE DE VIDA DO SERVIDOR
app.get('/', (req, res) => {
    console.log('🔥 Alguém acessou a raiz');
    res.send('Servidor online 🚀');
});

// 🔥 TESTE DO WEBHOOK VIA NAVEGADOR
app.get('/webhook', (req, res) => {
    console.log('🔥 Webhook GET acessado');
    res.send('Webhook ativo 🚀');
});

// Configuração do HubSpot
const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

// 🔥 WEBHOOK DO TWILIO (POST)
app.post('/webhook', async (req, res) => {
    console.log('🔥 WEBHOOK RECEBIDO'); // ESSENCIAL

    try {
        const nomeCliente = req.body.ProfileName || 'Lead WhatsApp';
        const numeroWhatsApp = req.body.WaId;
        const mensagemCorpo = (req.body.Body || '').toLowerCase().trim();

        console.log(`📱 Processando: ${nomeCliente} - ${numeroWhatsApp}`);
        console.log(`💬 Mensagem: ${mensagemCorpo}`);

        // 🔹 Responde PRIMEIRO (evita timeout do Twilio)
        let respostaTexto = `Olá, *${nomeCliente}*! Escolha uma opção:\n\n1️⃣ Audiovisual\n2️⃣ Sites\n3️⃣ Robôs\n4️⃣ Lojas`;

        if (mensagemCorpo === '1') {
            respostaTexto = `*${nomeCliente}*, vamos elevar seu audiovisual 🎥🔥`;
        }

        res.set('Content-Type', 'text/xml');
        res.send(`
            <Response>
                <Message>${respostaTexto}</Message>
            </Response>
        `);

        // 🔹 Depois salva no HubSpot (não trava resposta)
        if (process.env.HUBSPOT_ACCESS_TOKEN) {
            try {
                await hubspotClient.crm.contacts.basicApi.create({
                    properties: {
                        firstname: nomeCliente,
                        phone: numeroWhatsApp,
                        hs_content_membership_notes: `Interagiu com o Bot: ${mensagemCorpo}`
                    }
                });
                console.log("✅ Lead salvo no HubSpot");
            } catch (err) {
                console.error("❌ Erro HubSpot:", err.message);
            }
        }

    } catch (error) {
        console.error("❌ Erro Geral:", error);
        res.status(500).send("Erro");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WandersonWeb Ativo na porta ${PORT}`);
});