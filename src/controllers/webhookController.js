const flowService = require('../services/flowService');

exports.handleWebhook = async (req, res) => {
    const telefone = req.body.From;
    const msg = req.body.Body.trim().toLowerCase();

    const resposta = await flowService.processMessage(telefone, msg);

    res.set('Content-Type', 'text/xml');
    res.send(`
        <Response>
            <Message>${resposta}</Message>
        </Response>
    `);
};