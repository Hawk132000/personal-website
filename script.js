// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingText = document.querySelector('.dynamic-text');
    const words = [
        'Security Expert',
        'IAM Architect',
        'Security Strategist',
        'Cybersecurity Professional'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        isEnd = false;
        if (!typingText) return;
        
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;
        typingText.classList.add('stop-blinking');

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Removing
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Word completed
            isEnd = true;
            isDeleting = !isDeleting;
            typingText.classList.remove('stop-blinking');
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }

    // Start typing animation
    type();

    // Navigation scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Add your form submission logic here
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize hover animations for cards
    const initializeHoverEffects = () => {
        // Expertise cards hover effect
        const expertiseCards = document.querySelectorAll('.expertise-card');
        expertiseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Certification cards hover effect
        const certCards = document.querySelectorAll('.cert-card');
        certCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Initialize hover effects
    initializeHoverEffects();

    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(0)';
        });
    });
});

// Simple security grid animation
const createSecurityGrid = () => {
    const grid = document.querySelector('.security-grid');
    if (grid) {
        grid.style.opacity = '0.2';
        grid.style.backgroundImage = `
            linear-gradient(to right, rgba(52, 152, 219, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(52, 152, 219, 0.1) 1px, transparent 1px)
        `;
        grid.style.backgroundSize = '30px 30px';
        grid.style.animation = 'gridAnimation 20s linear infinite';
    }
};

// Initialize security grid
window.addEventListener('load', createSecurityGrid);
