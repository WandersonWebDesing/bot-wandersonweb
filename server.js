require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 4001;

// Log para conferir se as variáveis críticas estão presentes (sem expor os valores!)
const checkEnv = () => {
    const required = ['SUPABASE_URL', 'SUPABASE_KEY', 'HUBSPOT_ACCESS_TOKEN'];
    required.forEach(v => {
        if (!process.env[v]) console.warn(`⚠️  Aviso: Variável ${v} não encontrada.`);
    });
};

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    checkEnv();
});