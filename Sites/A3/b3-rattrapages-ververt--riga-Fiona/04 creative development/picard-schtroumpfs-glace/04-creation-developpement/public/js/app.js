class GlaceApp {
    constructor() {
        this.initEventListeners();
        this.createParticules();
        this.animateGlace();
    }

    initEventListeners() {
        const commanderBtn = document.getElementById('commanderBtn');
        const glaceContainer = document.getElementById('glaceContainer');
        const animationCard = document.getElementById('animationCard');

        commanderBtn.addEventListener('click', () => this.commander());
        glaceContainer.addEventListener('click', () => this.animateGlaceClick());

        // Animation interactive pour la nouvelle carte
        if (animationCard) {
            animationCard.addEventListener('click', () => this.triggerMagicAnimation());
        }

        // Animation au scroll
        window.addEventListener('scroll', () => this.handleScroll());
    }

    async commander() {
        const quantite = parseInt(document.getElementById('quantite').value);
        const messageDiv = document.getElementById('messageCommande');
        const stockSpan = document.getElementById('stockCount');

        try {
            const response = await fetch('/api/commander', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantite })
            });

            const data = await response.json();

            if (data.success) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message-commande success';
                stockSpan.textContent = data.nouveauStock;

                // Animation de succès
                this.celebrationAnimation();
            } else {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message-commande error';
            }
        } catch (error) {
            messageDiv.textContent = 'Erreur lors de la commande';
            messageDiv.className = 'message-commande error';
        }
    }

    animateGlaceClick() {
        const glace = document.querySelector('.glace-3d');
        glace.style.animation = 'none';
        setTimeout(() => {
            glace.style.animation = 'float 4s ease-in-out infinite';
        }, 10);

        // Créer des étincelles
        this.createSparkles();
    }

    createSparkles() {
        const container = document.querySelector('.glace-container');
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + 'px';
                sparkle.style.top = Math.random() * 100 + 'px';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'bounce 1s ease-out forwards';

                container.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    }

    celebrationAnimation() {
        // Confettis
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 50);
        }
    }

    createConfetti() {
        const confetti = document.createElement('div');
        const colors = ['🔵', '❄️', '✨', '🌟'];
        confetti.innerHTML = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '30px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = 'particule-fall 3s linear forwards';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }

    triggerMagicAnimation() {
        const animationCard = document.getElementById('animationCard');
        const magicText = animationCard.querySelector('.magic-text');

        // Toggle de la classe active
        animationCard.classList.toggle('active');

        if (animationCard.classList.contains('active')) {
            magicText.textContent = '✨ Magie activée ! ✨';

            // Créer des particules magiques
            this.createMagicParticles();

            // Désactiver après 3 secondes
            setTimeout(() => {
                animationCard.classList.remove('active');
                magicText.textContent = 'Cliquez pour révéler la magie !';
            }, 3000);
        }
    }

    createMagicParticles() {
        const animationCard = document.getElementById('animationCard');
        const cardRect = animationCard.getBoundingClientRect();

        // Créer plusieurs particules magiques
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = ['✨', '⭐', '💫', '🌟', '🧊'][Math.floor(Math.random() * 5)];
                particle.style.position = 'fixed';
                particle.style.left = (cardRect.left + Math.random() * cardRect.width) + 'px';
                particle.style.top = (cardRect.top + Math.random() * cardRect.height) + 'px';
                particle.style.fontSize = '1.5rem';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                particle.style.animation = 'magicParticle 2s ease-out forwards';

                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    createParticules() {
        const particules = document.getElementById('particules');

        setInterval(() => {
            if (Math.random() < 0.3) {
                const particule = document.createElement('div');
                particule.className = 'particule';
                particule.innerHTML = Math.random() < 0.5 ? '❄️' : '✨';
                particule.style.left = Math.random() * window.innerWidth + 'px';
                particule.style.animationDuration = (Math.random() * 5 + 5) + 's';

                particules.appendChild(particule);

                setTimeout(() => particule.remove(), 10000);
            }
        }, 500);
    }

    animateGlace() {
        // Animation supplémentaire pour la glace
        setInterval(() => {
            const gouttes = document.querySelector('.gouttes');
            if (gouttes) {
                gouttes.style.animation = 'none';
                setTimeout(() => {
                    gouttes.style.animation = 'goutte 3s ease-in-out infinite';
                }, 100);
            }
        }, 8000);
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const glace = document.querySelector('.glace-3d');

        if (glace) {
            const rotation = scrolled * 0.1;
            glace.style.transform = `rotateY(${rotation}deg)`;
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new GlaceApp();

    // Message de bienvenue
    setTimeout(() => {
        if (confirm('🧊 Bienvenue ! Voulez-vous découvrir notre glace à l\'eau mûre Schtroumpf ? Cliquez sur la glace pour des effets magiques ! ✨')) {
            document.querySelector('.glace-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, 1000);
});
