class IceApp {
    constructor() {
        this.initEventListeners();
        this.createParticles();
        this.animateIce();
    }

    initEventListeners() {
        const orderBtn = document.getElementById('orderBtn');
        const iceContainer = document.getElementById('iceContainer');
        const animationCard = document.getElementById('animationCard');

        orderBtn.addEventListener('click', () => this.order());
        iceContainer.addEventListener('click', () => this.animateIceClick());

        // Interactive animation for the new card
        if (animationCard) {
            animationCard.addEventListener('click', () => this.triggerMagicAnimation());
        }

        // Scroll animation
        window.addEventListener('scroll', () => this.handleScroll());
    }

    async order() {
        const quantity = parseInt(document.getElementById('quantity').value);
        const messageDiv = document.getElementById('orderMessage');
        const stockSpan = document.getElementById('stockCount');

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });

            const data = await response.json();

            if (data.success) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'order-message success';
                stockSpan.textContent = data.newStock;

                // Success animation
                this.celebrationAnimation();
            } else {
                messageDiv.textContent = data.message;
                messageDiv.className = 'order-message error';
            }
        } catch (error) {
            messageDiv.textContent = 'Error during order';
            messageDiv.className = 'order-message error';
        }
    }

    animateIceClick() {
        const ice = document.querySelector('.ice-3d');
        ice.style.animation = 'none';
        setTimeout(() => {
            ice.style.animation = 'float 4s ease-in-out infinite';
        }, 10);

        // Create sparks
        this.createSparkles();
    }

    createSparkles() {
        const container = document.querySelector('.ice-container');
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
        // Confetti
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

        // Toggle the active class
        animationCard.classList.toggle('active');

        if (animationCard.classList.contains('active')) {
            magicText.textContent = '✨ Magic activated! ✨';

            // Create magical particles
            this.createMagicParticles();

            // Disable after 3 seconds
            setTimeout(() => {
                animationCard.classList.remove('active');
                magicText.textContent = 'Click to reveal the magic!';
            }, 3000);
        }
    }

    createMagicParticles() {
        const animationCard = document.getElementById('animationCard');
        const cardRect = animationCard.getBoundingClientRect();

        // Create multiple magical particles
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

    createParticles() {
        const particles = document.getElementById('particles');

        setInterval(() => {
            if (Math.random() < 0.3) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.innerHTML = Math.random() < 0.5 ? '❄️' : '✨';
                particle.style.left = Math.random() * window.innerWidth + 'px';
                particle.style.animationDuration = (Math.random() * 5 + 5) + 's';

                particles.appendChild(particle);

                setTimeout(() => particle.remove(), 10000);
            }
        }, 500);
    }

    animateIce() {
        // Additional animation for the ice
        setInterval(() => {
            const drops = document.querySelector('.drops');
            if (drops) {
                drops.style.animation = 'none';
                setTimeout(() => {
                    drops.style.animation = 'drop 3s ease-in-out infinite';
                }, 100);
            }
        }, 8000);
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const ice = document.querySelector('.ice-3d');

        if (ice) {
            const rotation = scrolled * 0.1;
            ice.style.transform = `rotateY(${rotation}deg)`;
        }
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    new IceApp();

    // Welcome message
    setTimeout(() => {
        if (confirm('🧊 Welcome! Would you like to discover our Smurf blackberry water ice? Click on the ice for magical effects! ✨')) {
            document.querySelector('.ice-container').scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, 1000);
});
