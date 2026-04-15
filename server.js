app.post('/webhook', async (req, res) => {
    const mensagemCliente = req.body.Body;
    const numeroWhatsApp = req.body.WaId;
    const nomeCliente = req.body.ProfileName || 'parceiro';

    console.log(`📱 Processando Lead: ${nomeCliente} (${numeroWhatsApp})`);

    // GATILHO DE NEURODESIGN: Resposta com autoridade e foco na dor
    const respostaPersuasiva = `
Olá, ${nomeCliente}! Wanderson aqui. 👋

Recebi sua mensagem e já identifiquei que você busca elevar o nível do seu posicionamento digital. 

Muitos projetos falham não por falta de tecnologia, mas por falta de **Rapport** e **Neurodesign**. Hoje, um site que não converte é apenas um cartão de visitas caro. 

Para eu te entregar uma solução que realmente gere autoridade e feche negócios para você, me diga:
1️⃣ Qual o seu principal gargalo hoje (vendas, tráfego ou autoridade)?
2️⃣ O seu design atual comunica confiança ou afasta o seu cliente ideal?

Aguardo seu retorno para desenharmos essa estratégia. 🚀
    `;

    // LÓGICA DE ENVIO (TwiML)
    // Isso faz o Twilio responder automaticamente no WhatsApp
    const twimlResponse = `
    <Response>
        <Message>${respostaPersuasiva}</Message>
    </Response>`;

    res.status(200).type('text/xml').send(twimlResponse);
});