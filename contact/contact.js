// Turnstile State Management - Only declare if not already defined by script.js
if (typeof window.turnstileState === 'undefined') {
    window.turnstileState = {};
}
if (typeof window.TURNSTILE_SITE_KEY === 'undefined') {
    window.TURNSTILE_SITE_KEY = '0x4AAAAAACCREQrrdh14nsL1';
}
if (typeof window.turnstileInitialized === 'undefined') {
    window.turnstileInitialized = false;
}

// Initialize Turnstile for contact page form
function initializeContactPageTurnstile() {
    // Check if Turnstile API is loaded
    if (typeof turnstile === 'undefined') {
        console.warn('Turnstile API not loaded yet, retrying...');
        setTimeout(initializeContactPageTurnstile, 500);
        return;
    }

    // Initialize for contact page form only
    const contactPageTurnstile = document.getElementById('contactPageTurnstile');
    if (contactPageTurnstile && !window.turnstileState['contactPageForm'] && contactPageTurnstile.children.length === 0) {
        window.turnstileState['contactPageForm'] = { token: null, widgetId: null };
        try {
            window.turnstileState['contactPageForm'].widgetId = turnstile.render('#contactPageTurnstile', {
                sitekey: window.TURNSTILE_SITE_KEY,
                theme: 'light',
                callback: function(token) {
                    window.turnstileState['contactPageForm'].token = token;
                },
                'expired-callback': function() {
                    window.turnstileState['contactPageForm'].token = null;
                },
                'error-callback': function() {
                    window.turnstileState['contactPageForm'].token = null;
                }
            });
        } catch (e) {
            console.warn('Turnstile render error:', e);
        }
    }
}

// Reset Turnstile widget for contact page form
function resetContactPageTurnstile() {
    if (window.turnstileState['contactPageForm'] && window.turnstileState['contactPageForm'].widgetId !== null && typeof turnstile !== 'undefined') {
        turnstile.reset(window.turnstileState['contactPageForm'].widgetId);
        window.turnstileState['contactPageForm'].token = null;
    }
}

// Validate Turnstile token (client-side check - server should also validate)
async function validateContactPageTurnstileToken(token) {
    // Basic client-side validation
    if (!token || token.length === 0) {
        return { success: false };
    }
    // The actual validation should happen server-side
    // This just confirms we have a token
    return { success: true };
}

// Contact Page GSAP Animations
window.addEventListener('load', () => {
       // Initialize Turnstile widgets for contact page
       initializeContactPageTurnstile();
       
       const CONTACT_FORM_ID = 'contactPageForm';
       const CONTACT_API_BASE_URL = typeof API_BASE_URL !== 'undefined'
            ? API_BASE_URL
            : 'https://dbb-node-server.vercel.app';

       async function contactFormSubmission(contactForm) {
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                const turnstileToken = window.turnstileState[CONTACT_FORM_ID]?.token;

                if (!turnstileToken) {
                    alert('Please complete the security check before submitting.');
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnText;
                    return;
                }

                const validation = await validateContactPageTurnstileToken(turnstileToken);
                if (!validation.success) {
                    alert('Security validation failed. Please try again.');
                    resetContactPageTurnstile();
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnText;
                    return;
                }

                data.turnstileToken = turnstileToken;
                
                // Send to API
                const response = await fetch(`${CONTACT_API_BASE_URL}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    var count = 200;
                    var defaults = {
                    origin: { y: 0.7 }
                    };
        
                    function fire(particleRatio, opts) {
                    confetti({
                        ...defaults,
                        ...opts,
                        particleCount: Math.floor(count * particleRatio)
                    });
                    }
        
                    fire(0.25, {
                    spread: 26,
                    startVelocity: 55,
                    });
                    fire(0.2, {
                    spread: 60,
                    });
                    fire(0.35, {
                    spread: 100,
                    decay: 0.91,
                    scalar: 0.8
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 25,
                    decay: 0.92,
                    scalar: 1.2
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 45,
                    });
                    contactForm.reset();
                    resetContactPageTurnstile();
                    // Close the contact form overlay
                    const contactOverlay = document.getElementById('contactOverlay');
                    if (contactOverlay) {
                        contactOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        // Reset panel position
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
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnText;
            }
        }
        const form = document.getElementById('contactPageForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            console.log('form submitted from contact page!')
            await contactFormSubmission(form)
        })
});
