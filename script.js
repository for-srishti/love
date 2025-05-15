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

    // Try to autoplay music
    bgMusic.volume = 0.4;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(() => {
            isMusicPlaying = false;
        });
    }

    // Fun No button interactions
    const noBtn = document.querySelector('.no-btn');
    const messages = [
        "Nice try! 😏",
        "Not happening! 💝",
        "Try again! 😘",
        "Nope! 🥰",
        "Still no! 😊",
        "Getting tired? 😅",
        "Just click Yes! ❤️",
        "Almost there... to Yes! 💖"
    ];
    let messageIndex = 0;
    let runAwayCount = 0;

    function getRandomPosition(element, mouseX, mouseY) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = element.offsetWidth;
        const buttonHeight = element.offsetHeight;

        // Calculate the opposite direction from the mouse/touch
        let newX, newY;
        if (mouseX !== undefined && mouseY !== undefined) {
            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            
            // Move in the opposite direction of the mouse/touch
            newX = mouseX > centerX ? 
                Math.random() * (centerX - buttonWidth) : 
                centerX + Math.random() * (centerX - buttonWidth);
            newY = mouseY > centerY ? 
                Math.random() * (centerY - buttonHeight) : 
                centerY + Math.random() * (centerY - buttonHeight);
        } else {
            newX = Math.random() * (viewportWidth - buttonWidth);
            newY = Math.random() * (viewportHeight - buttonHeight);
        }

        // Ensure button stays within viewport
        newX = Math.min(Math.max(10, newX), viewportWidth - buttonWidth - 10);
        newY = Math.min(Math.max(10, newY), viewportHeight - buttonHeight - 10);

        return { x: newX, y: newY };
    }

    function updateButtonText() {
        noBtn.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    function moveButton(event) {
        runAwayCount++;
        
        // Get mouse/touch position
        const mouseX = event.type.includes('touch') ? 
            event.touches[0].clientX : 
            event.clientX;
        const mouseY = event.type.includes('touch') ? 
            event.touches[0].clientY : 
            event.clientY;

        const newPos = getRandomPosition(noBtn, mouseX, mouseY);
        
        // Add some fun animations
        noBtn.style.transition = 'all 0.3s ease';
        noBtn.style.position = 'fixed';
        noBtn.style.left = newPos.x + 'px';
        noBtn.style.top = newPos.y + 'px';
        
        // Change text after a few attempts
        if (runAwayCount % 2 === 0) {
            updateButtonText();
        }

        // Add some rotation for extra fun
        const rotation = (Math.random() - 0.5) * 30;
        noBtn.style.transform = `rotate(${rotation}deg)`;
    }

    // Handle both mouse and touch events
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton);
    noBtn.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while trying to touch the button
        moveButton(e);
    });

    // Reset position on window resize
    window.addEventListener('resize', () => {
        if (noBtn.style.position === 'fixed') {
            const newPos = getRandomPosition(noBtn);
            noBtn.style.left = newPos.x + 'px';
            noBtn.style.top = newPos.y + 'px';
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