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

        .success-image {
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            margin-bottom: 1.5rem;
            animation: fadeInScale 1s forwards;
        }

        .success-text {
            font-family: 'Dancing Script', cursive;
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-top: 1rem;
            animation: fadeInScale 1s forwards;
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Music control setup
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play();
            musicToggle.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Try to autoplay music (might be blocked by browser)
    bgMusic.volume = 0.4; // Set volume to 40%
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(() => {
            // Autoplay was prevented
            isMusicPlaying = false;
        });
    }

    // Add the no button movement functionality
    const noBtn = document.querySelector('.no-btn');
    
    function moveButton(button) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        const maxX = viewportWidth - buttonWidth - 20;
        const maxY = viewportHeight - buttonHeight - 20;
        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);
        
        button.style.position = 'fixed';
        button.style.transform = 'translate(0, 0)';
        button.style.left = newX + 'px';
        button.style.top = newY + 'px';
        button.style.zIndex = '9999';
    }

    noBtn.addEventListener('mouseover', () => moveButton(noBtn));
    noBtn.addEventListener('mousemove', (e) => {
        const rect = noBtn.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + 
            Math.pow(mouseY - buttonCenterY, 2)
        );
        if (distance < 100) {
            moveButton(noBtn);
        }
    });

    window.addEventListener('resize', () => {
        if (noBtn.style.position === 'fixed') {
            moveButton(noBtn);
        }
    });

    // Handle the yes button click
    window.acceptProposal = () => {
        const proposalSection = document.querySelector('.proposal-section');
        const buttons = document.querySelector('.proposal-buttons');
        
        // Create success content
        const successContent = document.createElement('div');
        successContent.className = 'proposal-success';
        
        // Add cute cat image
        const catImage = document.createElement('img');
        catImage.src = 'cutecat.jpg';
        catImage.alt = 'Cute Cat';
        catImage.className = 'success-image';
        
        // Add text
        const text = document.createElement('h2');
        text.textContent = 'My Kuchu Puchu';
        text.className = 'success-text';
        
        // Add elements to success content
        successContent.appendChild(catImage);
        successContent.appendChild(text);
        
        // Replace buttons with success content
        buttons.style.display = 'none';
        proposalSection.appendChild(successContent);
        
        // Create extra floating hearts
        for(let i = 0; i < 10; i++) {
            setTimeout(createHeart, i * 100);
        }
    };
}); 