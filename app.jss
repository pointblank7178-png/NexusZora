// NEXUS Token Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initActiveNavigation();
    initParallaxEffects();
    initScrollProgress();
    initCounterAnimations();
    initCopyToClipboard();
    initNewsletterForm();
    initButtonRipples();
    initScrollEffects();
    
    console.log('NEXUS Website initialized successfully');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    const allNavLinks = [...navLinks, ...footerLinks];
    
    console.log('Found navigation links:', allNavLinks.length);
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navigation link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                scrollToSection(targetSection);
                closeMobileMenu();
            } else {
                console.warn('Target section not found:', targetId);
            }
        });
    });
    
    // Handle hero action buttons
    const joinCommunityBtn = document.querySelector('.hero__actions .btn--primary');
    const viewWhitepaperBtn = document.querySelector('.hero__actions .btn--outline');
    
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Join Community button clicked');
            const communitySection = document.querySelector('#community');
            if (communitySection) {
                scrollToSection(communitySection);
            }
        });
    }
    
    if (viewWhitepaperBtn) {
        viewWhitepaperBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View Whitepaper button clicked');
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                scrollToSection(aboutSection);
            }
        });
    }
    
    // Handle Buy NXS button (scroll to community for now)
    const buyNxsBtn = document.querySelector('.nav__cta');
    if (buyNxsBtn) {
        buyNxsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Buy NXS button clicked');
            const communitySection = document.querySelector('#community');
            if (communitySection) {
                scrollToSection(communitySection);
            }
        });
    }
}

function scrollToSection(section) {
    const headerHeight = document.querySelector('.header').offsetHeight || 80;
    const targetPosition = section.offsetTop - headerHeight - 20;
    
    console.log('Scrolling to position:', targetPosition);
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log('Mobile menu elements:', { navToggle: !!navToggle, navMenu: !!navMenu });
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu when window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        const isActive = navMenu.classList.contains('nav__menu--active');
        
        if (isActive) {
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('nav__menu--active');
            navToggle.classList.add('nav__toggle--active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        console.log('Mobile menu toggled:', !isActive);
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('nav__menu--active');
        navToggle.classList.remove('nav__toggle--active');
        document.body.style.overflow = '';
        console.log('Mobile menu closed');
    }
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animations for specific sections
                if (entry.target.classList.contains('utilities__grid')) {
                    animateUtilityCards(entry.target);
                }
                
                if (entry.target.classList.contains('roadmap__timeline')) {
                    animateRoadmapItems(entry.target);
                }
                
                if (entry.target.classList.contains('tokenomics__breakdown')) {
                    animateTokenomicsItems(entry.target);
                }
                
                if (entry.target.classList.contains('community__links')) {
                    animateCommunityLinks(entry.target);
                }
                
                if (entry.target.classList.contains('values-grid')) {
                    animateValueItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const animatedElements = document.querySelectorAll(`
        .about__text,
        .about__values,
        .utilities__grid,
        .tokenomics__overview,
        .tokenomics__breakdown,
        .roadmap__timeline,
        .community__stats,
        .community__links,
        .newsletter,
        .values-grid
    `);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Animation functions with improved visibility
function animateUtilityCards(container) {
    const cards = container.querySelectorAll('.utility-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 150);
    });
}

function animateRoadmapItems(container) {
    const items = container.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 200);
    });
}

function animateTokenomicsItems(container) {
    const items = container.querySelectorAll('.breakdown-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 100);
    });
}

function animateCommunityLinks(container) {
    const links = container.querySelectorAll('.community-link');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
            link.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 100);
    });
}

function animateValueItems(container) {
    const items = container.querySelectorAll('.value-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 150);
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    function updateActiveNav() {
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }
    
    // Initial check
    setTimeout(updateActiveNav, 100);
    
    // Update on scroll
    window.addEventListener('scroll', throttle(updateActiveNav, 50));
}

// Parallax effects for hero section
function initParallaxEffects() {
    const heroBg = document.querySelector('.hero__bg-pattern');
    
    if (heroBg) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        }, 10));
    }
}

// Header background change on scroll
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }, 10));
    }
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min((scrollTop / docHeight) * 100, 100));
        
        progressBar.style.width = scrollPercent + '%';
    }, 10));
}

// Counter animation for statistics
function initCounterAnimations() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate community stats
                const stats = entry.target.querySelectorAll('.community-stat__value[data-target]');
                stats.forEach(stat => {
                    if (!stat.dataset.animated) {
                        const target = parseInt(stat.dataset.target);
                        animateCounter(stat, 0, target, 2000);
                        stat.dataset.animated = 'true';
                    }
                });
                
                // Animate hero stats
                if (entry.target.classList.contains('hero__stats')) {
                    const heroStats = entry.target.querySelectorAll('.stat__value');
                    heroStats.forEach(stat => {
                        if (!stat.dataset.animated) {
                            stat.dataset.animated = 'true';
                            const text = stat.textContent;
                            if (text.includes('1B')) {
                                animateHeroStat(stat, '1B NXS');
                            }
                        }
                    });
                }
            }
        });
    }, { threshold: 0.3 });
    
    // Observe stats sections
    const communityStats = document.querySelector('.community__stats');
    const heroStats = document.querySelector('.hero__stats');
    
    if (communityStats) {
        statsObserver.observe(communityStats);
    }
    
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        // Format numbers appropriately
        if (end >= 1000000) {
            const millions = (current / 1000000);
            element.textContent = millions < 1 ? '0M' : millions.toFixed(0) + 'M';
        } else if (end >= 1000) {
            const thousands = (current / 1000);
            element.textContent = thousands < 1 ? '0K' : thousands.toFixed(1) + 'K';
        } else {
            element.textContent = current.toLocaleString();
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Final formatting with + sign
            if (end >= 1000000) {
                element.textContent = (end / 1000000).toFixed(0) + 'M+';
            } else if (end >= 1000) {
                element.textContent = (end / 1000).toFixed(0) + 'K+';
            } else {
                element.textContent = end.toLocaleString() + '+';
            }
        }
    };
    
    window.requestAnimationFrame(step);
}

function animateHeroStat(element, finalText) {
    const numbers = ['0', '500M', '750M', '1B'];
    let index = 0;
    
    const interval = setInterval(() => {
        element.textContent = numbers[index] + ' NXS';
        index++;
        
        if (index >= numbers.length) {
            clearInterval(interval);
            element.textContent = finalText;
        }
    }, 300);
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    const copyBtn = document.getElementById('copy-contract');
    const contractAddress = document.getElementById('contract-address');
    
    if (copyBtn && contractAddress) {
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const text = contractAddress.textContent;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopyFeedback(copyBtn);
                }).catch(() => {
                    fallbackCopyTextToClipboard(text, copyBtn);
                });
            } else {
                fallbackCopyTextToClipboard(text, copyBtn);
            }
        });
    }
}

function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(button);
    } catch (err) {
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'âœ“';
    button.style.color = '#10B981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.color = '';
    }, 2000);
}

// Newsletter form handling
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = form.querySelector('.newsletter-input');
            const button = form.querySelector('.btn');
            const email = input.value.trim();
            
            if (email && isValidEmail(email)) {
                button.textContent = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    button.style.background = '#10B981';
                    input.value = '';
                    
                    setTimeout(() => {
                        button.textContent = 'Subscribe';
                        button.disabled = false;
                        button.style.background = '';
                    }, 3000);
                }, 1500);
            } else {
                input.style.borderColor = '#EF4444';
                input.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.placeholder = 'Enter your email address';
                }, 3000);
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Button ripple effects
function initButtonRipples() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn');
        if (btn) {
            // Remove existing ripples
            const existingRipples = btn.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create ripple effect
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            btn.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
   
