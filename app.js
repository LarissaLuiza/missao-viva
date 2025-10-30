// === 1. VARIÁVEIS GLOBAIS ===
const appContent = document.getElementById('app-content');
const mainNav = document.getElementById('main-nav');

/**
 * Exibe uma caixa de mensagem modal customizada, substituindo o alert() nativo.
 * @param {string} message - A mensagem a ser exibida.
 */
function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    document.getElementById('messageText').innerText = message;
    messageBox.style.display = 'block';
}

// === 2. TEMPLATES JAVASCRIPT (Conteúdo das Rotas) ===
// Define as funções que retornam o HTML para cada página da SPA.
const TEMPLATES = {
    // Template da página inicial ('home')
    home: () => `
        <section class="page-intro">
            <h2>Bem-vindo à Missão Viva</h2>
            <p>Encontre a sua causa. Cadastre-se como voluntário ou ajude um projeto hoje!</p>
        </section>
        <div class="form-container" style="text-align: center; padding: 50px;">
            <h3>Sua Jornada Começa Aqui!</h3>
            <p style="margin-bottom: 20px;">Use o menu acima para navegar.</p>
            <!-- Botão com data-route para navegar via JS -->
            <button class="cta-button" data-route="cadastro">Ir para Cadastro</button>
        </div>
    `,

    // Template da página de projetos ('projetos') - Simula o conteúdo do 'projetos.html'
    projetos: () => `
        <section class="page-intro">
            <h2>Projetos em Destaque</h2>
            <p>Conheça as iniciativas que estão transformando vidas na sua região.</p>
        </section>
        <div class="projetos-list" style="max-width: 600px; margin: 0 auto; padding: 20px; background: var(--color-light); border-radius: var(--border-radius); box-shadow: var(--shadow-soft);">
            <div style="border-bottom: 1px dashed var(--color-secondary); padding: 15px 0;">
                <h3 style="color: var(--color-primary);">Reflorestamento Local</h3>
                <p style="margin-top: 5px;">Plante uma árvore e ajude o meio ambiente. Buscamos 20 voluntários!</p>
            </div>
            <div style="border-bottom: 1px dashed var(--color-secondary); padding: 15px 0;">
                <h3 style="color: var(--color-primary);">Sopa Solidária</h3>
                <p style="margin-top: 5px;">Ajude a preparar e distribuir refeições para pessoas em situação de rua.</p>
            </div>
            <div style="padding: 15px 0;">
                <h3 style="color: var(--color-primary);">Aulas de Reforço</h3>
                <p style="margin-top: 5px;">Doe seu tempo ensinando crianças carentes.</p>
            </div>
            <p style="text-align: center; margin-top: 30px;">Faça seu <a data-route="cadastro" style="font-weight: 700;">Cadastro</a> para participar!</p>
        </div>
    `,

    // Template principal do formulário de cadastro ('cadastro') - Simula o conteúdo do 'cadastro.html'
    cadastro: () => `
        <section class="page-intro">
            <h2>Junte-se à Missão Viva</h2>
            <p>Preencha o formulário abaixo e participe como <strong>voluntário</strong>, <strong>doador</strong> ou <strong>representante de ONG</strong>.</p>
        </section>

        <section class="form-container">
            <form id="cadastro-form" class="modern-form">
                
                <!-- Seção: Informações pessoais -->
                <fieldset class="form-section">
                    <legend class="section-title">Informações Pessoais</legend>

                    <label for="nome">Nome Completo*</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>
                    <span class="error-message" data-input="nome">Nome é obrigatório.</span>

                    <label for="email">E-mail*</label>
                    <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" required>
                    <span class="error-message" data-input="email">E-mail inválido ou obrigatório.</span>

                    <label for="cpf">CPF*</label>
                    <input type="text" id="cpf" name="cpf" maxlength="14" placeholder="000.000.000-00" required>
                    <span class="error-message" data-input="cpf">CPF é obrigatório e deve ser válido.</span>

                    <label for="telefone">Telefone*</label>
                    <input type="tel" id="telefone" name="telefone" maxlength="15" placeholder="(00) 90000-0000" required>
                    <span class="error-message" data-input="telefone">Telefone é obrigatório.</span>

                    <label for="nascimento">Data de Nascimento*</label>
                    <input type="date" id="nascimento" name="nascimento" required>
                    <span class="error-message" data-input="nascimento">Data de nascimento é obrigatória.</span>
                </fieldset>

                <!-- Seção: Endereço -->
                <fieldset class="form-section">
                    <legend class="section-title">Endereço</legend>

                    <label for="cep">CEP*</label>
                    <input type="text" id="cep" name="cep" maxlength="9" placeholder="00000-000" required>
                    <span class="error-message" data-input="cep">CEP é obrigatório.</span>
                    
                    <label for="cidade">Cidade*</label>
                    <input type="text" id="cidade" name="cidade" required>
                    <span class="error-message" data-input="cidade">Cidade é obrigatória.</span>

                    <label for="estado">Estado*</label>
                    <select id="estado" name="estado" required>
                        <option value="">Selecione...</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PR">Paraná</option>
                    </select>
                    <span class="error-message" data-input="estado">Estado é obrigatório.</span>

                    <label for="endereco">Rua e Número*</label>
                    <input type="text" id="endereco" name="endereco" placeholder="Ex: Rua das Flores, 123" required>
                    <span class="error-message" data-input="endereco">Endereço é obrigatório.</span>

                    <label for="complemento">Complemento (Opcional)</label>
                    <input type="text" id="complemento" name="complemento" placeholder="Apartamento, Bloco, etc.">
                </fieldset>

                <!-- Seção: Tipo de Cadastro -->
                <fieldset class="form-section">
                    <legend class="section-title">Como Você Quer Participar?*</legend>

                    <div class="radio-group">
                        <input type="radio" id="voluntario" name="participacao" value="voluntario" required>
                        <label for="voluntario">Voluntário</label>
                        
                        <input type="radio" id="doador" name="participacao" value="doador">
                        <label for="doador">Doador</label>
                        
                        <input type="radio" id="ong" name="participacao" value="ong">
                        <label for="ong">ONG / Projeto Social</label>
                    </div>
                    <!-- Para rádio buttons, a mensagem de erro deve ser geral ou em um local específico -->
                    <span class="error-message" data-input="participacao" style="display: none; margin-top: 10px;">Selecione uma forma de participação.</span>

                    <label for="mensagem">Mensagem / Interesse (Opcional)</label>
                    <textarea id="mensagem" name="mensagem" rows="4" placeholder="Descreva suas habilidades ou o tipo de causa que gostaria de apoiar."></textarea>
                </fieldset>

                <div class="form-actions">
                    <button type="submit" class="cta-button">Finalizar Cadastro</button>
                </div>
            </form>
        </section>
    `,

    // Template da página de sucesso após o envio do formulário
    success: (data) => `
        <section class="page-intro">
            <h2>Cadastro Realizado com Sucesso! 🎉</h2>
            <p>Obrigado, ${data.nome}! Seu cadastro como <strong>${data.participacao}</strong> foi concluído.</p>
        </section>
        <div class="form-container" style="text-align: center; padding: 50px;">
            <h3>Detalhes Enviados:</h3>
            <p>Entraremos em contato em breve através do e-mail: <strong>${data.email}</strong></p>
            <p style="margin-top: 20px;">Use o botão abaixo para voltar ao início.</p>
            <button class="cta-button" data-route="home">Voltar ao Início</button>
        </div>
    `
};


// === 3. SISTEMA SPA BÁSICO ===

// Definição das rotas e seus respectivos templates
const ROUTES = {
    'home': { title: 'Início', template: TEMPLATES.home },
    'projetos': { title: 'Projetos', template: TEMPLATES.projetos },
    'cadastro': { title: 'Cadastro', template: TEMPLATES.cadastro }
};

/**
 * Renderiza o conteúdo da página com base na rota fornecida e gerencia o estado da navegação.
 * @param {string} route - A chave da rota (ex: 'home', 'cadastro').
 * @param {Object} [data=null] - Dados opcionais para templates (como a página de sucesso).
 */
function renderPage(route, data = null) {
    const page = ROUTES[route];
    
    // Verifica se a rota é válida ou se é a página de sucesso
    if (!page && route !== 'success') {
        showMessage(`Erro: Rota "${route}" não encontrada.`);
        route = 'home';
    }

    // 1. Renderiza o conteúdo
    const templateFunction = route === 'success' ? TEMPLATES.success : page.template;
    appContent.innerHTML = templateFunction(data);

    // 2. Atualiza o título da página
    document.title = `Missão Viva | ${page ? page.title : 'Sucesso'}`;

    // 3. Gerencia o estado ativo da navegação
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-route') === route) {
            link.classList.add('active');
        }
    });

    // 4. Se a rota for 'cadastro', configura o listener do formulário
    if (route === 'cadastro') {
        setupFormListener();
    }
}

// === 4. VALIDAÇÃO E EVENT LISTENERS DO FORMULÁRIO ===

/**
 * Exibe ou esconde a mensagem de erro e aplica a classe 'invalid' ao campo.
 * @param {HTMLElement} inputElement - O elemento de entrada (input, select, textarea).
 * @param {boolean} show - Se deve mostrar (true) ou esconder (false) o erro.
 * @param {string} [message=null] - Mensagem de erro customizada.
 */
function displayError(inputElement, show, message = null) {
    // Encontra a mensagem de erro associada ao campo pelo atributo data-input
    const errorMessage = document.querySelector(`.error-message[data-input="${inputElement.name}"]`);
    
    if (errorMessage) {
        errorMessage.style.display = show ? 'block' : 'none';
        if (message) {
            errorMessage.innerText = message;
        }
    }
    
    // Adiciona/Remove a classe de estilo de erro
    inputElement.classList.toggle('invalid', show);
}

// Funções utilitárias de validação
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidCpfFormat(cpf) {
    // Apenas verifica se tem 11 dígitos após remover caracteres não numéricos
    return cpf.replace(/[^\d]/g, '').length === 11;
}

/**
 * Valida um único campo do formulário (obrigatório, e-mail, CPF, idade).
 * @param {HTMLElement} field - O campo a ser validado.
 * @returns {boolean} - Retorna true se o campo for válido, false caso contrário.
 */
function validateSingleField(field) {
    const value = field.value.trim();
    let error = false;
    let message = '';
    
    displayError(field, false); 

    // 1. Validação de campos obrigatórios (vazio)
    if (field.hasAttribute('required') && field.type !== 'radio' && value === '') {
        const fieldName = field.name.charAt(0).toUpperCase() + field.name.slice(1);
        message = `${fieldName} é obrigatório.`;
        error = true;
    } 
    
    // 2. Validação Específica (apenas se o campo não estiver vazio)
    else if (value !== '') {
        if (field.name === 'email' && !isValidEmail(value)) {
            message = 'Por favor, insira um e-mail válido.';
            error = true;
        } 
        else if (field.name === 'cpf' && !isValidCpfFormat(value)) {
            message = 'O CPF deve ter 11 dígitos.';
            error = true;
        }
        // Validação de Data de Nascimento: maior de 18 anos
        else if (field.name === 'nascimento') {
            const today = new Date();
            const birthDate = new Date(value);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                 message = 'Você deve ter pelo menos 18 anos para se cadastrar.';
                 error = true;
            }
        }
    }
    
    if (error) {
        displayError(field, true, message);
    }
    return !error;
}


/**
 * Função principal de submissão e validação completa do formulário.
 * @param {Event} event - O evento de submissão.
 */
function validateForm(event) {
    event.preventDefault(); 
    const form = event.target;
    const elements = form.elements;
    let isValid = true;
    let firstErrorField = null; 
    
    // 1. Limpa todos os erros visuais
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
    form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    // 2. Itera sobre os campos
    for (let i = 0; i < elements.length; i++) {
        const field = elements[i];
        
        // Ignora elementos não relevantes para validação
        if (field.type === 'submit' || field.tagName === 'FIELDSET' || field.type === 'radio' || (field.value.trim() === '' && !field.hasAttribute('required'))) {
            continue;
        }

        if (!validateSingleField(field)) {
            isValid = false;
            if (!firstErrorField) {
                 firstErrorField = field;
            }
        }
    }
    
    // 3. Validação do grupo de rádio (participacao)
    const participacaoChecked = form.querySelector('input[name="participacao"]:checked');
    const participacaoErrorSpan = document.querySelector('.error-message[data-input="participacao"]');
    if (!participacaoChecked) {
        participacaoErrorSpan.style.display = 'block';
        isValid = false;
    } else {
        participacaoErrorSpan.style.display = 'none';
    }
    
    // 4. Foca no primeiro campo com erro
    if (firstErrorField) {
         firstErrorField.focus();
    }

    // 5. Processamento final (envio)
    if (isValid) {
        const formData = new FormData(form);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('Dados do Formulário Válidos:', data);
        
        // Redireciona para a página de sucesso
        renderPage('success', data);
    } else {
        showMessage("Por favor, corrija os erros nos campos marcados para finalizar o cadastro.");
    }
}

/**
 * Configura todos os event listeners para o formulário de cadastro.
 */
function setupFormListener() {
    const form = document.getElementById('cadastro-form');
    if (form) {
        // Listener de Submissão
        form.addEventListener('submit', validateForm);
        
        // Listener de Validação em Tempo Real (onblur)
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        requiredFields.forEach(field => {
            if (field.type !== 'radio' && field.type !== 'checkbox') {
                 field.addEventListener('blur', (e) => validateSingleField(e.target));
            }
        });
        
        // Listeners de Formatação (máscaras de CPF e Telefone)
        form.querySelector('#cpf').addEventListener('input', formatCpf);
        form.querySelector('#telefone').addEventListener('input', formatPhone);
    }
}

// Funções de formatação de entrada (CPF e Telefone)
function formatCpf(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
}

function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    e.target.value = value;
}

// === 5. SETUP INICIAL DA APLICAÇÃO ===

/**
 * Configura os listeners de navegação e renderiza a página inicial.
 */
function setupSPA() {
    // 1. Adiciona listener de navegação
    mainNav.addEventListener('click', (e) => {
        const route = e.target.getAttribute('data-route');
        const isCtaButton = e.target.classList.contains('cta-button');

        if (route) {
            e.preventDefault();
            renderPage(route);
        } else if (isCtaButton && e.target.closest('#app-content')) {
            // Trata botões de navegação dentro do conteúdo injetado (ex: "Ir para Cadastro")
            const contentRoute = e.target.getAttribute('data-route');
            if(contentRoute) {
                e.preventDefault();
                renderPage(contentRoute);
            }
        }
    });

    // 2. Renderiza a página inicial (Cadastro)
    renderPage('cadastro'); 
}

// Inicia a aplicação quando a janela estiver totalmente carregada
window.onload = setupSPA;
