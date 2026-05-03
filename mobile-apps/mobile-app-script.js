async function submitContactForm(contactForm) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.innerHTML = 'Sending...';
    
    try {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Send to API
        const response = await fetch('https://dbb-node-server.vercel.app/sendMessage', {
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

async function submitGetInTouchForm(getInTouchForm) {
    const submitBtn = getInTouchForm.querySelector('.btn-touch-submit');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.innerHTML = 'Sending...';
    
    try {
        // Get form data
        const formData = new FormData(getInTouchForm);
        const data = Object.fromEntries(formData);
        
        // Send to API
        const response = await fetch('https://dbb-node-server.vercel.app/sendMessage', {
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
            getInTouchForm.reset();
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

// GSAP Animations for Mobile Reviews Section
window.addEventListener('load', () => {
    // (Reviews heading and container entrance animations removed)

    // Initialize first review card with GSAP (functional carousel state)
    const mobileReviewCards = document.querySelectorAll('.mobile-review-card');
    if (mobileReviewCards.length > 0) {
        mobileReviewCards[0].classList.add('active');
        gsap.set(mobileReviewCards[0], { opacity: 1, filter: 'blur(0px)' });
    }
});

// (Mobile FAQ heading entrance animation removed)

// FAQ items are now always expanded - no accordion functionality needed