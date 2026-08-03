document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links and close mobile menu on click
    navItems.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // If it's a normal link (like resume.html), don't prevent default
            if (!targetId.startsWith('#')) {
                return; 
            }
            
            e.preventDefault();
            
            // Close menu if open
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio category dropdown toggle
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    portfolioCards.forEach(card => {
        const cardFront = card.querySelector('.card-front');
        
        cardFront.addEventListener('click', (e) => {
            const isActive = card.classList.contains('active');

            // Close other active cards for accordion effect
            portfolioCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                }
            });

            // Toggle current card
            if (!isActive) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });

    // Lightbox Modal Functionality
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');

    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent accordion toggling
            const img = item.querySelector('img');
            const title = item.querySelector('h5');
            const desc = item.querySelector('p');

            if (img && modal) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                modalTitle.textContent = title ? title.textContent : '';
                modalDesc.textContent = desc ? desc.textContent : '';

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
