// ============================================
// APPLE HIG - PORTFOLIO INTERACTIONS
// Spring-based animations & Apple-style interactions
// ============================================

// Theme Management - Apple style
class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || this.getSystemPreference();
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    init() {
        this.setTheme(this.theme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';

        // Add haptic-like visual feedback
        if (this.themeToggle) {
            this.themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 100);
        }

        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        if (!this.themeToggle) return;
        const icon = this.themeToggle.querySelector('i');
        if (icon) {
            icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Navigation Manager - Apple style
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.lastScrollY = 0;
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
                    // Close mobile menu first
                    this.closeMobileMenu();

                    // Smooth scroll with offset for fixed navbar
                    const offsetTop = targetSection.offsetTop - 60;
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
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveLink(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        if (!this.hamburger) return;

        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') &&
                !this.navMenu.contains(e.target) &&
                !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isOpen = this.navMenu.classList.contains('active');
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navMenu.classList.add('active');
        this.hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupScrollEffect() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 20) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScrollY = scrollY;
    }
}

// Animation Manager - Apple Spring Style
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
        this.setupCounterAnimations();
        this.setupHeroAnimation();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation delay for grouped items
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay * 100);
                }
            });
        }, this.observerOptions);

        // Add animation classes with stagger
        const animatedGroups = [
            { selector: '.skill-category', parent: '.skills-grid' },
            { selector: '.project-card', parent: '.projects-grid' },
            { selector: '.contact-item', parent: '.contact-details' }
        ];

        animatedGroups.forEach(group => {
            const elements = document.querySelectorAll(group.selector);
            elements.forEach((el, index) => {
                el.classList.add('animate-on-scroll');
                el.dataset.delay = index;
                observer.observe(el);
            });
        });

        // Single elements
        const singleElements = document.querySelectorAll('.about-card, .contact-form');
        singleElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-social');

        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';

            setTimeout(() => {
                el.style.transition = 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        // Hero image bounce in
        const heroImage = document.querySelector('.hero-avatar');
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.8)';

            setTimeout(() => {
                heroImage.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 300);
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
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = element.textContent;
        const isInfinity = target === '∞';

        if (isInfinity) {
            element.style.animation = 'pulse 2s ease-in-out infinite';
            return;
        }

        const numericTarget = parseInt(target.replace('+', ''));
        if (isNaN(numericTarget)) return;

        let current = 0;
        const duration = 1500;
        const startTime = performance.now();
        const hasSuffix = target.includes('+');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Apple-style easing (ease-out-expo)
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            current = Math.floor(easeOutExpo * numericTarget);

            element.textContent = current + (hasSuffix ? '+' : '');

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(animate);
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
            this.setupFormValidation();
            this.setupFormSubmission();
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Apple-style focus effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
                this.validateField(input);
            });
        });
    }

    validateField(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('error');
            return false;
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                return false;
            }
        }

        input.classList.remove('error');
        return true;
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            // Form will submit normally to Formspree
            // Just add loading state
            const submitBtn = this.form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        });
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;

        // Animate in
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        this.form.appendChild(messageDiv);

        requestAnimationFrame(() => {
            messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Project Card Interactions - Apple style
class ProjectInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.setupProjectCards();
        this.setupHoverEffects();
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            // Subtle tilt effect on hover (disabled for reduced motion)
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
                card.addEventListener('mouseleave', () => this.resetTilt(card));
            }
        });
    }

    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    resetTilt(card) {
        card.style.transform = '';
    }

    setupHoverEffects() {
        // Tech tags bounce effect
        const techTags = document.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.05)';
            });
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1)';
            });
        });

        // Icon skills subtle bounce
        const iconSkills = document.querySelectorAll('.icon-skill');
        iconSkills.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                const icon = skill.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15)';
                }
            });
            skill.addEventListener('mouseleave', () => {
                const icon = skill.querySelector('.skill-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
}

// Projects Carousel - Apple Style
class ProjectsCarousel {
    constructor() {
        this.carousel = document.getElementById('projects-carousel');
        this.grid = document.getElementById('projects-grid');
        this.prevBtn = document.getElementById('projects-prev');
        this.nextBtn = document.getElementById('projects-next');
        this.pagination = document.getElementById('projects-pagination');
        this.cards = [];
        this.currentIndex = 0;
        this.isAnimating = false;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.lastX = 0;
        this.lastTime = 0;

        if (this.grid && this.carousel) {
            this.init();
        }
    }

    init() {
        this.cards = Array.from(this.grid.querySelectorAll('.project-card'));
        this.createPaginationDots();
        this.setupNavigation();
        this.setupDragScroll();
        this.setupScrollListener();
        this.setupKeyboardNavigation();
        this.updateState();

        // Initial hint animation after a short delay
        setTimeout(() => this.showSwipeHint(), 2000);
    }

    createPaginationDots() {
        if (!this.pagination) return;

        this.pagination.innerHTML = '';
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'projects-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to project ${index + 1}`);
            dot.addEventListener('click', () => this.scrollToIndex(index));
            this.pagination.appendChild(dot);
        });
    }

    setupNavigation() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scrollPrev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scrollNext());
        }
    }

    setupDragScroll() {
        // Mouse events
        this.grid.addEventListener('mousedown', (e) => this.handleDragStart(e));
        document.addEventListener('mousemove', (e) => this.handleDragMove(e));
        document.addEventListener('mouseup', () => this.handleDragEnd());

        // Touch events
        this.grid.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: true });
        this.grid.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: true });
        this.grid.addEventListener('touchend', () => this.handleDragEnd());

        // Prevent default drag behavior on cards
        this.cards.forEach(card => {
            card.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }

    handleDragStart(e) {
        if (this.isAnimating) return;

        this.isDragging = true;
        this.grid.style.cursor = 'grabbing';
        this.grid.style.scrollBehavior = 'auto';

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        this.startX = clientX;
        this.scrollLeft = this.grid.scrollLeft;
        this.lastX = clientX;
        this.lastTime = performance.now();
        this.velocity = 0;
    }

    handleDragMove(e) {
        if (!this.isDragging) return;

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const now = performance.now();
        const dt = now - this.lastTime;

        // Calculate velocity for momentum
        if (dt > 0) {
            this.velocity = (clientX - this.lastX) / dt;
        }

        const walk = (clientX - this.startX) * 1.5; // Multiply for faster feel
        this.grid.scrollLeft = this.scrollLeft - walk;

        this.lastX = clientX;
        this.lastTime = now;
    }

    handleDragEnd() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.grid.style.cursor = '';
        this.grid.style.scrollBehavior = 'smooth';

        // Apply momentum scrolling (Apple-style spring physics)
        if (Math.abs(this.velocity) > 0.5) {
            this.applyMomentum();
        } else {
            // Snap to nearest card
            this.snapToNearestCard();
        }

        this.updateState();
    }

    applyMomentum() {
        const momentum = this.velocity * 200; // Amount of momentum
        const targetScroll = this.grid.scrollLeft - momentum;

        // Clamp to bounds
        const maxScroll = this.grid.scrollWidth - this.grid.clientWidth;
        const clampedScroll = Math.max(0, Math.min(maxScroll, targetScroll));

        this.grid.scrollTo({
            left: clampedScroll,
            behavior: 'smooth'
        });

        // After momentum, snap to nearest card
        setTimeout(() => this.snapToNearestCard(), 300);
    }

    snapToNearestCard() {
        const cardWidth = this.cards[0]?.offsetWidth || 340;
        const gap = 24; // var(--spacing-lg)
        const scrollPosition = this.grid.scrollLeft;
        const nearestIndex = Math.round(scrollPosition / (cardWidth + gap));
        this.scrollToIndex(Math.max(0, Math.min(nearestIndex, this.cards.length - 1)));
    }

    setupScrollListener() {
        let scrollTimeout;
        this.grid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateState();
            }, 50);
        });
    }

    setupKeyboardNavigation() {
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.scrollPrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.scrollNext();
            }
        });

        // Make carousel focusable
        this.carousel.setAttribute('tabindex', '0');
        this.carousel.setAttribute('role', 'region');
        this.carousel.setAttribute('aria-label', 'Featured projects carousel');
    }

    scrollPrev() {
        if (this.isAnimating || this.currentIndex <= 0) return;
        this.scrollToIndex(this.currentIndex - 1);
    }

    scrollNext() {
        if (this.isAnimating || this.currentIndex >= this.cards.length - 1) return;
        this.scrollToIndex(this.currentIndex + 1);
    }

    scrollToIndex(index) {
        if (this.isAnimating) return;

        const card = this.cards[index];
        if (!card) return;

        this.isAnimating = true;
        this.currentIndex = index;

        // Calculate scroll position to center the card
        const cardRect = card.getBoundingClientRect();
        const gridRect = this.grid.getBoundingClientRect();
        const cardCenter = card.offsetLeft + cardRect.width / 2;
        const gridCenter = gridRect.width / 2;
        const scrollTarget = cardCenter - gridCenter;

        // Smooth scroll with spring-like easing
        this.grid.scrollTo({
            left: Math.max(0, scrollTarget),
            behavior: 'smooth'
        });

        // Update state after animation
        setTimeout(() => {
            this.isAnimating = false;
            this.updateState();
        }, 400);

        this.updatePaginationDots();
    }

    updateState() {
        const scrollLeft = this.grid.scrollLeft;
        const maxScroll = this.grid.scrollWidth - this.grid.clientWidth;
        const threshold = 10;

        // Update carousel classes for edge gradients
        if (scrollLeft > threshold) {
            this.carousel.classList.add('can-scroll-left');
        } else {
            this.carousel.classList.remove('can-scroll-left');
        }

        if (scrollLeft < maxScroll - threshold) {
            this.carousel.classList.add('can-scroll-right');
        } else {
            this.carousel.classList.remove('can-scroll-right');
        }

        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.classList.toggle('disabled', scrollLeft <= threshold);
        }
        if (this.nextBtn) {
            this.nextBtn.classList.toggle('disabled', scrollLeft >= maxScroll - threshold);
        }

        // Update current index based on scroll position
        const cardWidth = this.cards[0]?.offsetWidth || 340;
        const gap = 24;
        this.currentIndex = Math.round(scrollLeft / (cardWidth + gap));
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, this.cards.length - 1));

        this.updatePaginationDots();
    }

    updatePaginationDots() {
        if (!this.pagination) return;

        const dots = this.pagination.querySelectorAll('.projects-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    showSwipeHint() {
        // Only show hint if not already scrolled and reduced motion is not preferred
        if (this.grid.scrollLeft === 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.grid.classList.add('hint-animation');
            setTimeout(() => {
                this.grid.classList.remove('hint-animation');
            }, 1000);
        }
    }
}

// Subtle Background Effect (more minimal than before)
class SubtleBackground {
    constructor() {
        // Only initialize if reduced motion is not preferred
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.init();
        }
    }

    init() {
        // Add subtle gradient that follows scroll
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 500);
            hero.style.setProperty('--gradient-opacity', opacity);
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new ContactFormManager();
    new ProjectInteractions();
    new ProjectsCarousel();
    new SubtleBackground();
});

// Add dynamic styles for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-link.active {
        color: var(--system-blue) !important;
        font-weight: 500;
    }

    /* Mobile menu body lock */
    body.menu-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
    }

    /* Loading state for button */
    .btn.loading {
        opacity: 0.7;
        pointer-events: none;
    }

    .btn.loading::after {
        content: '';
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-left: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Form error state */
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--system-red);
    }

    /* Pulse animation */
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.9; }
    }
`;
document.head.appendChild(dynamicStyles);
