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
    
    // 5. NOVO RESET: Reseta a posição de todos os contêineres de informação
    // ESSA LINHA RESOLVE O BUG DO TEXTO EMPURRADO AO VOLTAR DE ABA
    document.querySelectorAll('.infos').forEach(infos => {
        infos.classList.remove('shifted');
    });

    // 6. Exibe apenas a nav da aba ativa, se ela existir
    const activeNav = document.querySelector(`#${contentId} .tab-nav`);
    if (activeNav) {
        activeNav.style.display = 'flex'; // Exibe a nav correspondente
    }
};

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const currentActiveTab = document.querySelector('.tab-btn.active');
tabClicked(currentActiveTab);

// Lógica para abrir/fechar a nav da aba ativa (Mantida)
navToggleBtn.addEventListener('click', () => {
    const activeContent = document.querySelector('.content.show');
    if (activeContent) {
        const activeNav = activeContent.querySelector('.tab-nav');
        const infosContainer = activeContent.querySelector('.infos');

        if (activeNav && infosContainer) {
            activeNav.classList.toggle('open');
            navToggleBtn.classList.toggle('open');
            // O toggle que empurra e desempurra o texto
            infosContainer.classList.toggle('shifted'); 

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

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.configurationsqlI');
    const overlay = document.getElementById('image-overlay');
    
    // FUNÇÃO PARA FECHAR O MODO AMPLIADO
    function closeLightbox() {
        overlay.classList.remove('is-active'); // Esconde o Overlay
        
        // Remove a classe de ampliação de TODAS as imagens
        images.forEach(img => {
            img.classList.remove('is-expanded');
        });
    }

    // 1. Ação ao Clicar em QUALQUER Imagem
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            
            // Se a imagem já estiver expandida, apenas fecha.
            if (e.currentTarget.classList.contains('is-expanded')) {
                closeLightbox();
                return; // Encerra a função
            }

            // Garante que todas as outras imagens estejam fechadas antes de abrir a nova
            closeLightbox(); 

            // Liga o Overlay e a Imagem Clicada
            overlay.classList.add('is-active'); // Mostra o Overlay
            e.currentTarget.classList.add('is-expanded'); // Amplia a imagem clicada
        });
    });
    
    // 2. Ação ao Clicar no Fundo Escuro (para fechar)
    overlay.addEventListener('click', closeLightbox);
});