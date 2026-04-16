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
    // Captura o nome real do WhatsApp. Se não existir, tratamos como 'futuro parceiro'
    const nomeCliente = req.body.ProfileName || 'futuro parceiro';
    const mensagemCorpo = (req.body.Body || '').toLowerCase().trim();
    
    console.log(`📱 Lead Identificado: ${nomeCliente} | Mensagem: ${mensagemCorpo}`);

    let respostaTexto = "";

    // Lógica de Menu e Persuasão
    if (['oi', 'olá', 'ola', 'menu', 'bom dia', 'boa tarde'].some(saudacao => mensagemCorpo.includes(saudacao))) {
        respostaTexto = `Prezado(a) *${nomeCliente}*, é um prazer ter você por aqui. Sou o Wanderson. 👋

No mercado atual, quem não é visto com autoridade é ignorado. Eu não apenas entrego serviços, eu construo **ativos digitais de alto impacto** usando Neurodesign e Rapport.

Como posso elevar o nível do seu negócio hoje? Escolha uma opção:

1️⃣  *Audiovisual de Elite:* Fotografia, Gravação e Edição de vídeos que vendem por você.
2️⃣  *Web & Neurodesign:* Sites ultra-rápidos focados em conversão psicológica.
3️⃣  *Marketing & Automação:* Estratégias digitais e Criação de WhatsApp Robots.
4️⃣  *Visita Presencial:* Nossas 3 unidades (Arapoangas, Planaltina e Plano Piloto).

*Digite apenas o número desejado para iniciarmos a estratégia.*`;
    } 
    
    else if (mensagemCorpo === '1') {
        respostaTexto = `Excelente escolha, *${nomeCliente}*. Imagens e vídeos de baixa qualidade matam sua autoridade. 📸🎥

Minha entrega audiovisual é focada em narrativa persuasiva. Seja para marcas pessoais ou empresas, criamos o desejo de compra antes mesmo do cliente falar com você. 

Deseja ver meu portfólio ou agendar uma sessão de gravação?`;
    }

    else if (mensagemCorpo === '2') {
        respostaTexto = `*${nomeCliente}*, um site sem Neurodesign é apenas um custo. O meu foco é transformar seu site em um vendedor que não dorme. 💻

Aplico gatilhos de autoridade e hierarquia visual para que seu cliente tome a decisão de compra em segundos. 

Quer que eu faça uma análise rápida do seu posicionamento atual?`;
    }

    else if (mensagemCorpo === '3') {
        respostaTexto = `A tecnologia deve trabalhar para você, *${nomeCliente}*. 🤖

Com Marketing Digital e WhatsApp Robots, escalamos seu atendimento e suas vendas sem aumentar sua carga de trabalho. É a inteligência artificial a serviço do seu lucro.

Podemos conversar sobre como automatizar seu funil de vendas?`;
    }

    else if (mensagemCorpo === '4') {
        respostaTexto = `Será um prazer receber você, *${nomeCliente}*. A presença física consolida a confiança. 📍

Escolha a unidade mais próxima para agendarmos um café:

📌 *Arapoangas:* [Link do Maps]
📌 *Feira de Planaltina:* [Link do Maps]
📌 *Rodoviária do Plano Piloto:* [Link do Maps]

Qual dessas unidades fica melhor para você?`;
    }

    else {
        respostaTexto = `*${nomeCliente}*, entendi sua mensagem. Para que eu seja assertivo na sua solução de Neurodesign, digite *MENU* para ver meus serviços ou aguarde um instante que já irei analisar seu caso pessoalmente. 🚀`;
    }

    // Resposta XML formatada para o Twilio
    res.header('Content-Type', 'text/xml');
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${respostaTexto}</Message>
</Response>`;

    res.status(200).send(twiml);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WandersonWeb Operacional na Porta ${PORT}`);
});