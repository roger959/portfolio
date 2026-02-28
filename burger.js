// --- Burger menu améloré pour meilleure UX mobile ---
(function setupBurgerMenu() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    // Éviter double injection
    if (document.getElementById('nav-toggle')) return;

    // Créer le bouton burger
    const btn = document.createElement('button');
    btn.id = 'nav-toggle';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    // Placer le bouton au début de la nav
    nav.insertBefore(btn, nav.firstChild);

    let isMenuOpen = false;

    // Fonction pour basculer l'état du menu
    function toggleNav(shouldOpen) {
        const newState = typeof shouldOpen === 'boolean' ? shouldOpen : !isMenuOpen;
        
        if (newState === isMenuOpen) return; // Éviter les changements d'état inutiles
        
        isMenuOpen = newState;
        
        if (isMenuOpen) {
            nav.classList.add('open');
            btn.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('aria-label', 'Fermer le menu');
            document.body.style.overflow = 'hidden';
        } else {
            nav.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Ouvrir le menu');
            document.body.style.overflow = '';
        }
    }

    // Fermer le menu avec délai pour laisser l'utilisateur cliquer
    function closeMenu() {
        if (isMenuOpen) {
            toggleNav(false);
        }
    }

    // Clic sur le bouton burger
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav();
    });

    // Fermer le menu lors du clic sur un lien
    nav.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && isMenuOpen) {
            // Utiliser une courte animation avant fermeture
            setTimeout(closeMenu, 100);
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            btn.focus();
        }
    });

    // Fermer en cliquant en dehors du menu (avec délai court)
    document.addEventListener('click', (e) => {
        if (!isMenuOpen) return;
        
        // Vérifier if click was on nav or inside nav
        if (!nav.contains(e.target) && e.target !== btn) {
            closeMenu();
        }
    });

    // Fermer le menu lors du redimensionnement si passage en desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 150);
    });

    // Initialiser le state au chargement
    isMenuOpen = nav.classList.contains('open');
})();
