const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// 🔹 salvar lead
exports.salvarLead = async (telefone) => {
    const { data, error } = await supabase
        .from('leads')
        .insert([{ telefone }]);

    if (error) {
        console.error('❌ Erro Supabase:', error);
    } else {
        console.log('✅ Lead salvo no Supabase');
    }
};

// 🔹 atualizar nome
exports.atualizarNome = async (telefone, nome) => {
    await supabase
        .from('leads')
        .update({ nome, status: 'qualificado' })
        .eq('telefone', telefone);
};