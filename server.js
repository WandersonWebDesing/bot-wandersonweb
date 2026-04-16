const express = require('express');
const { Client } = require('@hubspot/api-client'); // Importa HubSpot
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do HubSpot
const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

app.post('/webhook', async (req, res) => {
    try {
        const nomeCliente = req.body.ProfileName || 'Lead WhatsApp';
        const numeroWhatsApp = req.body.WaId; // Ex: 556199788904
        const mensagemCorpo = (req.body.Body || '').toLowerCase().trim();

        console.log(`📱 Processando: ${nomeCliente} - ${numeroWhatsApp}`);

        // --- 1. SALVAR NO HUBSPOT (Opcional: Apenas se houver Token) ---
        if (process.env.HUBSPOT_ACCESS_TOKEN) {
            try {
                await hubspotClient.crm.contacts.basicApi.create({
                    properties: {
                        firstname: nomeCliente,
                        phone: numeroWhatsApp,
                        hs_content_membership_notes: `Interagiu com o Bot: Opção ${mensagemCorpo}`
                    }
                });
                console.log("✅ Lead salvo no HubSpot");
            } catch (err) {
                console.error("❌ Erro HubSpot:", err.message);
            }
        }

        // --- 2. LÓGICA DE RESPOSTA (O seu Menu) ---
        let respostaTexto = `Olá, *${nomeCliente}*! Escolha uma opção:\n\n1️⃣ Audiovisual\n2️⃣ Sites\n3️⃣ Robôs\n4️⃣ Lojas`;

        if (mensagemCorpo === '1') respostaTexto = `*${nomeCliente}*, vamos elevar seu audiovisual...`;
        // ... (resto do seu menu aqui)

        res.header('Content-Type', 'text/xml');
        res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Message>${respostaTexto}</Message></Response>`);

    } catch (error) {
        console.error("❌ Erro Geral:", error);
        res.status(500).send("Erro");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 WandersonWeb Ativo na porta ${PORT}`));