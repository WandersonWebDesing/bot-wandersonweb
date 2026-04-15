// No topo do arquivo
try {
    require('dotenv').config();
} catch (e) {
    // Em produção no Render, o dotenv não é necessário
}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

if (!HUBSPOT_TOKEN) {
    console.log("⚠️  Aviso: Variável HUBSPOT_ACCESS_TOKEN não encontrada.");
} else {
    console.log("✅ Conexão com HubSpot configurada!");
}

// ... seu código de rotas (app.get, app.post) continua aqui ...

// Garante que o PORT seja pego do ambiente ou use 10000 (padrão do Render) se o 4001 falhar
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor online na porta ${PORT}`);
    console.log(`🔗 URL: https://bot-wandersonweb.onrender.com`);
});