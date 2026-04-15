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

// NA PARTE FINAL DO ARQUIVO (Substitua o app.listen antigo por este):
const PORT = process.env.PORT || 4001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});