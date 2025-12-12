
// --- Burger menu injection + gestion (ciblage par id #nav) ---
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
    btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    // Placer le bouton au début de la nav
    nav.insertBefore(btn, nav.firstChild);

    // Fonction pour basculer l'état du menu
    function toggleNav(open) {
        const isOpen = typeof open === 'boolean' ? open : !nav.classList.contains('open');
        nav.classList.toggle('open', isOpen);
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');

        // Bloquer/débloquer le scroll du body sur mobile
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Clic sur le bouton burger
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav();
    });

    // Fermer le menu lors du clic sur un lien
    nav.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && nav.classList.contains('open')) {
            setTimeout(() => toggleNav(false), 150);
        }
    });

    // Fermer avec la touche Échap
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            toggleNav(false);
            btn.focus(); // Remettre le focus sur le bouton
        }
    });

    // Fermer en cliquant en dehors du menu
    document.addEventListener('click', (e) => {
        if (!nav.classList.contains('open')) return;
        if (!nav.contains(e.target)) {
            toggleNav(false);
        }
    });

    // Fermer le menu lors du redimensionnement si passage en desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && nav.classList.contains('open')) {
                toggleNav(false);
            }
        }, 150);
    });
})();