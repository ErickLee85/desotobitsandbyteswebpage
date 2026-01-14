// Turnstile State Management
const turnstileState = {};
const TURNSTILE_SITE_KEY = '0x4AAAAAACCREQrrdh14nsL1';
let turnstileInitialized = false;

// Initialize Turnstile widget for contact form
function initializeTurnstile() {
    if (turnstileInitialized) return;
    
    if (typeof turnstile === 'undefined') {
        setTimeout(initializeTurnstile, 500);
        return;
    }
    
    turnstileInitialized = true;

    const contactFormTurnstile = document.getElementById('contactFormTurnstile');
    if (contactFormTurnstile && !turnstileState['contactForm'] && contactFormTurnstile.children.length === 0) {
        turnstileState['contactForm'] = { token: null, widgetId: null };
        try {
            turnstileState['contactForm'].widgetId = turnstile.render('#contactFormTurnstile', {
                sitekey: TURNSTILE_SITE_KEY,
                theme: 'light',
                callback: (token) => { turnstileState['contactForm'].token = token; },
                'expired-callback': () => { turnstileState['contactForm'].token = null; },
                'error-callback': () => { turnstileState['contactForm'].token = null; }
            });
        } catch (e) { console.warn('Turnstile render error:', e); }
    }
}

// Reset Turnstile widget
function resetTurnstileForForm(formId) {
    if (turnstileState[formId] && turnstileState[formId].widgetId !== null && typeof turnstile !== 'undefined') {
        turnstile.reset(turnstileState[formId].widgetId);
        turnstileState[formId].token = null;
    }
}

// Form submission handler
async function submitContactForm(contactForm) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.innerHTML = 'Sending...';
    
    try {
        const turnstileToken = turnstileState['contactForm']?.token;
        if (!turnstileToken) {
            alert('Please complete the security check before submitting.');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = originalBtnText;
            return;
        }

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        data.turnstileToken = turnstileToken;
        
        const response = await fetch('https://dbb-node-server.vercel.app/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Confetti celebration
            var count = 200;
            var defaults = { origin: { y: 0.7 } };

            function fire(particleRatio, opts) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
            
            contactForm.reset();
            resetTurnstileForForm('contactForm');
            
            // Close the contact form overlay
            const contactOverlay = document.getElementById('contactOverlay');
            if (contactOverlay) {
                contactOverlay.classList.remove('active');
                document.body.style.overflow = '';
                const contactFormPanel = document.getElementById('contactFormPanel');
                if (contactFormPanel) {
                    gsap.set(contactFormPanel, { x: '100%' });
                    gsap.set(contactOverlay, { opacity: 0 });
                }
            }
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalBtnText;
    }
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Turnstile
    initializeTurnstile();

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Mobile services dropdown toggle
    const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
    const mobileMenuDropdown = document.querySelector('.mobile-menu-dropdown');
    const mobileDropdownArrow = document.querySelector('.mobile-dropdown-arrow');

    if (mobileServicesToggle && mobileMenuDropdown) {
        mobileServicesToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenuDropdown.classList.toggle('active');
            if (mobileDropdownArrow) {
                mobileDropdownArrow.classList.toggle('rotated');
            }
        });
    }

    // Desktop services dropdown toggle
    const desktopServicesLink = document.querySelector('.nav-dropdown > .service-link');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (desktopServicesLink && navDropdown) {
        desktopServicesLink.addEventListener('mouseenter', () => {
            navDropdown.classList.add('active');
        });
        desktopServicesLink.addEventListener('click', (e) => {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when mouse leaves the dropdown area
        navDropdown.addEventListener('mouseleave', () => {
            navDropdown.classList.remove('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });

        // Close dropdown when clicking a dropdown item
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                navDropdown.classList.remove('active');
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for blog cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Contact Form Overlay Animation
const contactOverlay = document.getElementById('contactOverlay');
const contactFormPanel = document.getElementById('contactFormPanel');
const contactCloseBtn = document.getElementById('contactCloseBtn');
const getQuoteBtns = document.querySelectorAll('.getQuoteBtn');
const contactForm = document.getElementById('contactForm');

if (contactOverlay && contactFormPanel && getQuoteBtns.length > 0) {
    // Create timeline for opening animation
    const openTimeline = gsap.timeline({ paused: true });

    // Set initial states for overlay and panel
    gsap.set(contactOverlay, { opacity: 0 });
    gsap.set(contactFormPanel, { x: '100%' });

    // Open animation
    openTimeline
        .to(contactOverlay, {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.out'
        })
        .to(contactFormPanel, {
            x: '0%',
            duration: 0.4,
            ease: 'power3.out'
        }, '-=0.1');

    // Close animation
    const closeTimeline = gsap.timeline({ paused: true });

    closeTimeline
        .to(contactFormPanel, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in'
        })
        .to(contactOverlay, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                contactOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, '-=0.1');

    // Open contact form
    function openContactForm() {
        contactOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        openTimeline.restart();
    }

    // Close contact form
    function closeContactForm() {
        closeTimeline.restart();
    }

    // Event listeners for get quote buttons
    getQuoteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContactForm();
        });
    });

    if (contactCloseBtn) {
        contactCloseBtn.addEventListener('click', () => {
            closeContactForm();
        });
    }

    // Close on overlay click (outside panel)
    contactOverlay.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            closeContactForm();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactOverlay.classList.contains('active')) {
            closeContactForm();
        }
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await submitContactForm(contactForm);
        });
    }
}
