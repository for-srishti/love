document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for all elements
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add fade-in animation to elements when they become visible
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('.message-card, .photo-gallery, .reasons-section, .reason-item').forEach((el) => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add floating hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Create floating hearts periodically
    setInterval(createHeart, 3000);

    // Add CSS for the animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .floating-heart {
            position: fixed;
            font-size: 1.5rem;
            user-select: none;
            pointer-events: none;
            animation: float linear forwards;
            z-index: 999;
        }

        @keyframes float {
            0% { transform: translateY(100vh); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Add the no button movement functionality
    const noBtn = document.querySelector('.no-btn');
    const moveDistance = 100; // pixels to move

    noBtn.addEventListener('mouseover', (e) => {
        const btnRect = noBtn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width;
        const maxY = window.innerHeight - btnRect.height;

        // Generate random position
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        // Ensure button stays in viewport
        newX = Math.min(Math.max(0, newX), maxX);
        newY = Math.min(Math.max(0, newY), maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    });

    // Handle the yes button click
    window.acceptProposal = () => {
        const proposalSection = document.querySelector('.proposal-section');
        const buttons = document.querySelector('.proposal-buttons');
        
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'proposal-success';
        successMsg.innerHTML = '❤️ You\'ve made me the happiest person! ❤️';
        
        // Replace buttons with success message
        buttons.style.display = 'none';
        proposalSection.appendChild(successMsg);
        successMsg.style.display = 'block';

        // Create extra floating hearts
        for(let i = 0; i < 10; i++) {
            setTimeout(createHeart, i * 100);
        }
    };
}); 