// --- Défilement automatique des compétences ---
(function setupSkillsCarousel() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const skillsLists = document.querySelectorAll('.skills-list');

        skillsLists.forEach((skillsList) => {
            const skills = Array.from(skillsList.querySelectorAll('.skill-item'));
            if (skills.length === 0) return;

            const isTools = skillsList.classList.contains('skills-tools');

            // Créer le wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'skills-carousel-wrapper';
            skillsList.parentNode.insertBefore(wrapper, skillsList);

            // Créer le track — items placés directement dedans (pas de sous-liste)
            const track = document.createElement('div');
            track.className = 'skills-carousel-track' + (isTools ? ' skills-carousel-track--tools' : '');
            wrapper.appendChild(track);

            // Supprimer la liste originale
            skillsList.remove();

            // Ajouter le premier jeu d'items
            skills.forEach(item => track.appendChild(item.cloneNode(true)));

            setTimeout(() => {
                // Mesurer le gap CSS réel du track
                const gapPx = parseFloat(getComputedStyle(track).columnGap) || (isTools ? 16 : 24);

                // Pitch = largeur d'un jeu + 1 gap (pour jointure seamless entre deux jeux)
                const pitch = track.scrollWidth + gapPx;

                // Nombre de jeux supplémentaires pour remplir 3x la largeur de l'écran
                const numExtra = Math.ceil((window.innerWidth * 3) / pitch) + 2;

                for (let i = 0; i < numExtra; i++) {
                    skills.forEach(item => track.appendChild(item.cloneNode(true)));
                }

                // Vitesse : 60px/s pour outils, 45px/s pour compétences
                const speed = isTools ? 60 : 45;
                const duration = pitch / speed;

                track.style.setProperty('--scroll-distance', pitch + 'px');
                track.style.setProperty('--animation-duration', duration + 's');
                track.classList.add('animate');
            }, 200);

            // Pause au survol
            wrapper.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
            wrapper.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
        });
    }
})();
