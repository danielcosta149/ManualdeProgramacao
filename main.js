const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');
const navToggleBtn = document.getElementById('nav-toggle');

const tabClicked = (tab) => {
    // 1. Esconde todos os conteúdos das abas
    contents.forEach(content => content.classList.remove('show'));
    // 2. Remove a classe 'active' de todos os botões
    tabs.forEach(btn => btn.classList.remove('active'));
    
    tab.classList.add('active');

    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);
    
    if (content) {
        content.classList.add('show');
    }

    // 3. Reseta o botão de controle
    navToggleBtn.classList.remove('open');
    navToggleBtn.innerHTML = '☰';
    navToggleBtn.style.backgroundColor = 'rgb(24, 70, 110)'; 

    // 4. Esconde todas as navs
    document.querySelectorAll('.tab-nav').forEach(nav => {
        nav.classList.remove('open');
        nav.style.display = 'none'; // Continua escondendo todas as navs
    });
    
    // 5. Exibe apenas a nav da aba ativa, se ela existir
    const activeNav = document.querySelector(`#${contentId} .tab-nav`);
    if (activeNav) {
        activeNav.style.display = 'flex'; // Exibe a nav correspondente
    }
};

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const currentActiveTab = document.querySelector('.tab-btn.active');
tabClicked(currentActiveTab);

// Lógica para abrir/fechar a nav da aba ativa
navToggleBtn.addEventListener('click', () => {
    const activeContent = document.querySelector('.content.show');
    if (activeContent) {
        const activeNav = activeContent.querySelector('.tab-nav');
        const infosContainer = activeContent.querySelector('.infos');

        if (activeNav && infosContainer) {
            // Alterna a classe 'open' na nav
            activeNav.classList.toggle('open');
            // Alterna a classe 'open' no botão também
            navToggleBtn.classList.toggle('open');
            // Alterna a classe 'shifted' no contêiner de infos
            infosContainer.classList.toggle('shifted');

            // Muda o ícone do botão e a sua cor
            if (activeNav.classList.contains('open')) {
                navToggleBtn.innerHTML = 'X';
                navToggleBtn.style.backgroundColor = 'rgb(240, 50, 50)';
            } else {
                navToggleBtn.innerHTML = '☰';
                navToggleBtn.style.backgroundColor = 'rgb(24, 70, 110)';
            }
        }
    }
});