const btnEntrar = document.getElementById('btnEntrar');
const mensagem = document.getElementById('mensagem');

btnEntrar.addEventListener('click', function () {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    mensagem.className = 'mensagem-erro';
    mensagem.textContent = '';

    if (!email || !senha) {
        mensagem.textContent = '⚠️ Preencha todos os campos!';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        mensagem.textContent = '⚠️ Digite um e-mail válido!';
        return;
    }

    if (senha.length < 6) {
        mensagem.textContent = '⚠️ A senha deve ter no mínimo 6 caracteres!';
        return;
    }

    mensagem.className = 'mensagem-sucesso';
    mensagem.textContent = '✅ Login realizado com sucesso!';

    alert('Bem-vindo ao Nexus Vision, ' + email + '!');
});