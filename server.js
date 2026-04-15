const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    require('dotenv').config();
} catch (e) {}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

app.get('/', (req, res) => {
    res.send('<h1>WandersonWeb Strategy Online</h1>');
});

app.post('/webhook', (req, res) => {
    const nomeCliente = req.body.ProfileName || 'parceiro';
    const mensagemCorpo = (req.body.Body || '').toLowerCase();
    
    console.log(`📱 Lead: ${nomeCliente} | Mensagem: ${mensagemCorpo}`);

    // --- LÓGICA DE PSICOLOGIA E RAPPORT ---
    let respostaTexto = "";

    // Se for a primeira mensagem ou um "oi"
    if (mensagemCorpo.includes('oi') || mensagemCorpo.includes('ola') || mensagemCorpo.includes('menu')) {
        respostaTexto = `Olá, ${nomeCliente}! Sou Wanderson, estrategista da **WandersonWeb**. 👋

Se você está aqui, é porque não busca apenas um serviço, mas um **posicionamento de alto valor**. No mercado atual, a percepção de autoridade é o que separa quem dá desconto de quem cobra o preço justo.

Como posso acelerar o seu projeto hoje?

1️⃣ **Audiovisual de Elite:** Fotografia, Gravação e Edição de vídeos com narrativa persuasiva.
2️⃣ **Web Design & Neurodesign:** Sites criados para converter visitantes em clientes.
3️⃣ **Automação Inteligente:** Criação de Bots (WhatsApp Robot) e Marketing Digital.
4️⃣ **Nossas Unidades:** Localização das lojas físicas.

*Digite o número da opção desejada.*`;
    } 
    // Opção de Localização (Gatilho de Prova Social e Presença Física)
    else if (mensagemCorpo === '4') {
        respostaTexto = `Com certeza! Estamos estrategicamente localizados para te atender:

📍 **Unidade Arapoangas:** [Link do Maps]
📍 **Unidade Feira de Planaltina:** [Link do Maps]
📍 **Unidade Rodoviária do Plano Piloto:** [Link do Maps]

Qual dessas é mais acessível para agendarmos uma reunião presencial?`;
    }
    // Resposta padrão para outras opções
    else {
        respostaTexto = `Entendido! Estou processando sua solicitação sobre este serviço. 

Enquanto isso, me diga: qual é o seu maior desafio atual em relação a isso? Ter essa clareza é o primeiro passo para aplicarmos o **Neurodesign** de forma eficaz no seu negócio. 🚀`;
    }

    // --- RESPOSTA XML PARA O TWILIO ---
    res.header('Content-Type', 'text/xml');
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${respostaTexto}</Message>
</Response>`;

    res.status(200).send(twiml);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WandersonWeb operando na porta ${PORT}`);
});