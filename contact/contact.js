// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Turnstile State Management
const turnstileState = {};
const TURNSTILE_SITE_KEY = '0x4AAAAAACCREQrrdh14nsL1';
let turnstileInitialized = false;

// Initialize Turnstile widgets
function initializeTurnstile() {
    // Prevent multiple initializations
    if (turnstileInitialized) {
        return;
    }

    // Check if Turnstile API is loaded
    if (typeof turnstile === 'undefined') {
        console.warn('Turnstile API not loaded yet, retrying...');
        setTimeout(initializeTurnstile, 500);
        return;
    }

    turnstileInitialized = true;

    // Initialize for contact page form only
    const contactPageTurnstile = document.getElementById('contactPageTurnstile');
    if (contactPageTurnstile && !turnstileState['contactPageForm'] && contactPageTurnstile.children.length === 0) {
        turnstileState['contactPageForm'] = { token: null, widgetId: null };
        try {
            turnstileState['contactPageForm'].widgetId = turnstile.render('#contactPageTurnstile', {
                sitekey: TURNSTILE_SITE_KEY,
                theme: 'light',
                callback: function(token) {
                    turnstileState['contactPageForm'].token = token;
                    updateFormSubmitState('contactPageForm', true);
                },
                'expired-callback': function() {
                    turnstileState['contactPageForm'].token = null;
                    updateFormSubmitState('contactPageForm', false);
                },
                'error-callback': function() {
                    turnstileState['contactPageForm'].token = null;
                    updateFormSubmitState('contactPageForm', false);
                }
            });
        } catch (e) {
            console.warn('Turnstile render error:', e);
        }
    }

    // Note: The overlay contact form Turnstile (contactFormTurnstile) is handled by script.js
}

// Update form submit button state based on Turnstile verification
function updateFormSubmitState(formId, isVerified) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        // You can optionally disable the button until verified
        // submitBtn.disabled = !isVerified;
    }
}

// Reset Turnstile widget for a specific form
function resetTurnstileForForm(formId) {
    if (turnstileState[formId] && turnstileState[formId].widgetId !== null) {
        turnstile.reset(turnstileState[formId].widgetId);
        turnstileState[formId].token = null;
    }
}

// Validate Turnstile token (client-side check - server should also validate)
async function validateTurnstileToken(token) {
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
       // Initialize Turnstile widgets
       initializeTurnstile();
       
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
                const turnstileToken = turnstileState[CONTACT_FORM_ID]?.token;

                if (!turnstileToken) {
                    alert('Please complete the security check before submitting.');
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnText;
                    return;
                }

                const validation = await validateTurnstileToken(turnstileToken);
                if (!validation.success) {
                    alert('Security validation failed. Please try again.');
                    resetTurnstileForForm(CONTACT_FORM_ID);
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
                    resetTurnstileForForm(CONTACT_FORM_ID);
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

    // Left side animations - translateY with opacity
    const leftContact = document.querySelector('.left-contact');
    
    if (leftContact) {
        const leftElements = leftContact.children;
        
        gsap.fromTo(leftElements, 
            {
                opacity: 0,
                y: 80,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.15,
                delay: 0.3,
                ease: 'power3.out'
            }
        );
    }

    // Right side animations - scale up and translateX from right
    const rightContact = document.querySelector('.right-contact');
    
    if (rightContact) {
        gsap.fromTo(rightContact,
            {
                opacity: 0,
                scale: 0.9,
                x: 100,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                scale: 1,
                x: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                delay: 0.5,
                ease: 'power3.out'
            }
        );

        // Animate form elements individually after form appears
        const formGroups = rightContact.querySelectorAll('.form-group');
        const submitBtn = rightContact.querySelector('.contact-submit-btn');
        
        gsap.fromTo(formGroups,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 1.2,
                ease: 'power2.out'
            }
        );

        if (submitBtn) {
            gsap.fromTo(submitBtn,
                {
                    opacity: 0,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: 1.8,
                    ease: 'back.out(1.5)'
                }
            );
        }
    }

    // Add hover animations for form inputs
    // const inputs = document.querySelectorAll('.right-contact input, .right-contact textarea');
    // inputs.forEach(input => {
    //     input.addEventListener('focus', () => {
    //         gsap.to(input.closest('.form-group') || input.closest('.input-container'), {
    //             scale: 1.02,
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });

    //     input.addEventListener('blur', () => {
    //         gsap.to(input.closest('.form-group') || input.closest('.input-container'), {
    //             scale: 1,
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });
    // });

    // // Submit button hover animation
    // const submitBtn = document.querySelector('.contact-submit-btn');
    // if (submitBtn) {
    //     submitBtn.addEventListener('mouseenter', () => {
    //         gsap.to(submitBtn, {
    //             scale: 1.05,
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });

    //     submitBtn.addEventListener('mouseleave', () => {
    //         gsap.to(submitBtn, {
    //             scale: 1,
    //             duration: 0.3,
    //             ease: 'power2.out'
    //         });
    //     });
    // }

    // Support items animation on scroll
    const supportItems = document.querySelectorAll('.support .item');
    if (supportItems.length > 0) {
        supportItems.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 1.5 + (index * 0.15),
                    ease: 'power2.out'
                }
            );
        });
    }
});
