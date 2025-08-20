// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateThemeIcon();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.theme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }
}

// Smooth Scrolling and Navigation
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupMobileMenu();
        this.setupScrollEffect();
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        // Ensure hamburger exists
        if (!this.hamburger) {
            console.error('Hamburger menu not found');
            return;
        }

        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't prevent default - let the link work
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Prevent body scroll when menu is open
        const style = document.createElement('style');
        style.textContent = `
            body.menu-open {
                overflow: hidden;
                position: fixed;
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTypingEffect();
        this.setupCounterAnimations();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.skill-category, .project-card, .about-card, .contact-form'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.innerHTML;
            heroTitle.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isInfinity = target === '∞';
        
        if (isInfinity) {
            element.style.animation = 'pulse 2s infinite';
            return;
        }

        const numericTarget = parseInt(target.replace('+', ''));
        let current = 0;
        const increment = numericTarget / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
            }
        }, 40);
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        this.form.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.className = 'particle-background';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        this.ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Project Card Interactions
class ProjectInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectCards();
        this.setupSkillTags();
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new ContactFormManager();
    new ParticleBackground();
    new ProjectInteractions();
});

// Add CSS for animations
const animationCSS = `
.animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .navbar.scrolled {
    background: rgba(13, 17, 23, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.form-message {
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 1rem;
    font-weight: 500;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.nav-link.active {
    color: var(--text-primary);
}

.nav-link.active::after {
    width: 100%;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: var(--background-primary);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: var(--transition);
        border-top: 1px solid var(--border-color);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);
