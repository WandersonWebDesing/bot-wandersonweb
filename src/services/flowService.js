const supabaseService = require('./supabaseService');
const hubspotService = require('./hubspotService');

const usuarios = {};

exports.processMessage = async (telefone, msg) => {

    // 🔹 NOVO LEAD
    if (!usuarios[telefone]) {
        usuarios[telefone] = { etapa: 'nome' };

        await supabaseService.salvarLead(telefone);

        return '👋 Olá! Qual seu nome?';
    }

    // 🔹 CAPTURA NOME
    if (usuarios[telefone].etapa === 'nome') {
        usuarios[telefone].nome = msg;
        usuarios[telefone].etapa = 'menu';

        await supabaseService.atualizarNome(telefone, msg);
        await hubspotService.criarContato(msg, telefone);

        return `🤝 Prazer, ${msg}!\n\n1️⃣ Site\n2️⃣ WhatsBot\n3️⃣ Marketing`;
    }

    // 🔹 MENU
    const nome = usuarios[telefone].nome;

    const opcoes = {
        '1': `🌐 ${nome}, criamos sites que vendem!`,
        '2': `🤖 ${nome}, automação completa no WhatsApp!`,
        '3': `📊 ${nome}, marketing que gera clientes!`
    };

    return opcoes[msg] || '❌ Escolha 1, 2 ou 3';
};