// --- Défilement automatique des compétences ---
(function setupSkillsCarousel() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const skillsLists = document.querySelectorAll('.skills-list');
        
        skillsLists.forEach((skillsList) => {
            // Vérifier qu'il y a des compétences
            const skills = skillsList.querySelectorAll('.skill-item');
            if (skills.length === 0) return;

            // Créer un wrapper pour le défilement
            const wrapper = document.createElement('div');
            wrapper.className = 'skills-carousel-wrapper';
            skillsList.parentNode.insertBefore(wrapper, skillsList);
            
            // Créer le conteneur de défilement
            const track = document.createElement('div');
            track.className = 'skills-carousel-track';
            
            // Cloner la liste originale
            const originalContent = skillsList.cloneNode(true);
            const clonedContent = skillsList.cloneNode(true);
            
            // Ajouter les deux listes au track
            track.appendChild(originalContent);
            track.appendChild(clonedContent);
            
            // Remplacer la liste originale par le wrapper
            wrapper.appendChild(track);
            skillsList.remove();
            
            // Calculer la largeur totale pour l'animation
            setTimeout(() => {
                const trackWidth = originalContent.scrollWidth;
                const animationDuration = trackWidth / 40; // Vitesse: 40px par seconde
                
                track.style.setProperty('--track-width', `-${trackWidth}px`);
                track.style.setProperty('--animation-duration', `${animationDuration}s`);
                
                // Démarrer l'animation
                track.classList.add('animate');
            }, 100);
            
            // Pause au survol
            wrapper.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            wrapper.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        });
    }
})();