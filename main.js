// =========================================================
// 1. VARIÁVEIS GLOBAIS E CONFIGURAÇÕES
// =========================================================
const loadedSections = {}; // Monitora o que já foi carregado via fetch
const overlay = document.getElementById('image-overlay');
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');
const navToggleBtn = document.getElementById('nav-toggle');

// =========================================================
// 2. FUNÇÕES DO LIGHTBOX (AMPLIAÇÃO DE IMAGENS)
// =========================================================
function closeLightbox() {
    overlay.classList.remove('is-active');
    document.querySelectorAll('.is-expanded').forEach(img => {
        img.classList.remove('is-expanded');
    });
}

function handleImageClick(e) {
    if (e.currentTarget.classList.contains('is-expanded')) {
        closeLightbox();
        return;
    }
    closeLightbox(); 
    overlay.classList.add('is-active');
    e.currentTarget.classList.add('is-expanded');
}

function setupLightbox(images) {
    images.forEach(img => {
        // removeEventListener evita duplicar o evento se a função for chamada de novo
        img.removeEventListener('click', handleImageClick); 
        img.addEventListener('click', handleImageClick);
    });
}

overlay.addEventListener('click', closeLightbox);

// =========================================================
// 3. FUNÇÃO DE CARREGAMENTO EXTERNO (INCLUDE)
// =========================================================
const loadSectionContent = (contentId, filePath) => {
    // Se já carregou uma vez, não faz nada (performance)
    if (loadedSections[contentId]) return;

    const contentElement = document.getElementById(contentId);
    
    if (contentElement) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status}`);
                return response.text();
            })
            .then(data => {
                contentElement.innerHTML = data;
                loadedSections[contentId] = true; 
                
                // Reativa o Lightbox para as novas imagens que acabaram de chegar
                const newImages = contentElement.querySelectorAll('.configurationsqlI');
                setupLightbox(newImages); 

                // CORREÇÃO DA NAV: Força a exibição da barra lateral assim que o arquivo carrega
                const internalNav = contentElement.querySelector('.tab-nav');
                if (internalNav) {
                    internalNav.style.display = 'flex';
                }
            })
            .catch(error => {
                console.error(`Falha ao carregar ${contentId}:`, error);
                contentElement.innerHTML = `<p style="color:red">Erro ao carregar conteúdo.</p>`;
            });
    }
};

// =========================================================
// 4. LÓGICA DE TROCA DE ABAS
// =========================================================
const tabClicked = (tab) => {
    // Esconde conteúdos e remove destaques de botões
    contents.forEach(content => content.classList.remove('show'));
    tabs.forEach(btn => btn.classList.remove('active'));
    
    tab.classList.add('active');
    const contentId = tab.getAttribute('content-id');
    const content = document.getElementById(contentId);
    
    if (content) {
        content.classList.add('show');
    }

    // Gerencia os Includes (Git e SQL)
    if (contentId === 'GIT') {
        loadSectionContent('GIT', 'githubsection.html');
    } else if (contentId === 'SQL') {
        loadSectionContent('SQL', 'mysqlsection.html');
    }

    // Reset da Interface (Botão Hamburguer e Navs)
    navToggleBtn.classList.remove('open');
    navToggleBtn.innerHTML = '☰';
    navToggleBtn.style.backgroundColor = 'rgb(24, 70, 110)'; 

    document.querySelectorAll('.tab-nav').forEach(nav => {
        nav.classList.remove('open');
        nav.style.display = 'none';
    });
    
    document.querySelectorAll('.infos').forEach(infos => {
        infos.classList.remove('shifted');
    });

    // Mostra a nav se ela já existir no DOM (para abas que não são via fetch)
    const activeNav = document.querySelector(`#${contentId} .tab-nav`);
    if (activeNav) {
        activeNav.style.display = 'flex';
    }
};

// Listeners das abas
tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

// =========================================================
// 5. INICIALIZAÇÃO E EVENTOS GERAIS
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicia na aba que estiver marcada como 'active' no HTML
    const currentActiveTab = document.querySelector('.tab-btn.active');
    if (currentActiveTab) tabClicked(currentActiveTab);

    // Lightbox inicial para imagens que já existam no index.html
    const initialImages = document.querySelectorAll('.configurationsqlI');
    setupLightbox(initialImages);
});

// Botão Hamburguer (Mobile/Tablet)
navToggleBtn.addEventListener('click', () => {
    const activeContent = document.querySelector('.content.show');
    if (activeContent) {
        const activeNav = activeContent.querySelector('.tab-nav');
        const infosContainer = activeContent.querySelector('.infos');

        if (activeNav && infosContainer) {
            activeNav.classList.toggle('open');
            navToggleBtn.classList.toggle('open');
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