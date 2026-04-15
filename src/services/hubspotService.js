const axios = require('axios');

exports.criarContato = async (nome, telefone) => {
    try {
        await axios.post(
            'https://api.hubapi.com/crm/v3/objects/contacts',
            {
                properties: {
                    firstname: nome,
                    phone: telefone
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Lead enviado para HubSpot');
    } catch (error) {
        console.error('❌ Erro HubSpot:', error.response?.data || error.message);
    }
};