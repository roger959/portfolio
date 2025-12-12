document.addEventListener("DOMContentLoaded", () => {

    /* ---- Bouton de démarrage ---- */
    const startButton = document.getElementById("start-button");
    if (startButton) {
        startButton.addEventListener("click", () => {
            startButton.classList.add("clicked");
            startButton.style.transform = "scale(0.95)";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 600);
        });
    }

    /* ---- Animations d'entrée (Anime.js) ---- */
    if (typeof anime !== "undefined") {
        const tl = anime.timeline({
            easing: "easeOutQuad",
            duration: 800
        });

        tl.add({
            targets: ".neon-text",
            opacity: [0, 1],
            translateY: [-20, 0],
        })
        .add({
            targets: "#start-button",
            opacity: [0, 1],
            scale: [0.9, 1],
        }, "-=400")
        .add({
            targets: ".content-box, .container",
            opacity: [0, 1],
            translateY: [20, 0],
        }, "-=400");
    }

    /* ---- Fond animé (particules connectées professionnelles) ---- */
    let canvas = document.getElementById("particles-canvas");
    
    // Crée le canvas s'il n'existe pas
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "particles-canvas";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");

    // Redimensionne le canevas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Classe des particules
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 2 + 1;
        }

        move() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 183, 255, 0.6)";
            ctx.fill();
        }
    }

    // Initialisation
    const particles = [];
    const particleCount = 70;
    const maxDistance = 150;

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Lignes de connexion
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDistance) {
                    const opacity = 1 - dist / maxDistance;
                    ctx.strokeStyle = `rgba(0, 183, 255, ${opacity * 0.25})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.move();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
});