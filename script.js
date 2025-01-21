

    const form = document.querySelector('.my-form');
    const submitBtn = document.querySelector('.form-submit-btn')
    const successToast = document.querySelector('.success-toast')
    const failToast = document.querySelector('.fail-toast')
    const closeTimer = document.querySelector('.close-timer');
    const closeTimerFail = document.querySelector('.close-timer-fail');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get the reCAPTCHA response token
            const recaptchaToken = grecaptcha.getResponse();
            
            if (!recaptchaToken) {
                alert('Please complete the reCAPTCHA');
                return;
            }
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            document.querySelector('.form-inactive').style.display = 'none';
            document.querySelector('.form-active').style.display = 'flex';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            
            try {
                
           
                
                const response = await fetch('https://nodemailer-gold.vercel.app/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...data,
                        recaptchaToken
                    })
                });
                // const response = await fetch('http://localhost:3000/sendMessage', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         ...data,
                //         recaptchaToken
                //     })
                // });
                
                const result = await response.json();
                if (result.success) {
                   successToast.classList.add('open')
                   closeTimer.classList.add('start')
        
                   setTimeout(() => {
                    successToast.classList.add('close')
                   }, 5000);
                    form.reset();
                    grecaptcha.reset(); // Reset the reCAPTCHA widget
                } else {
                   failToast.classList.add('open')
                   closeTimerFail.classList.add('start')
                   setTimeout(() => {
                    failToast.classList.add('close')
                   }, 5000);
                   submitBtn.disabled = false;
                   submitBtn.style.opacity = '1';
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                document.querySelector('.form-inactive').style.display = 'flex';
                document.querySelector('.form-active').style.display = 'none';
            }
        });
        
    }
const successClose = document.querySelector('.close-btn-success');
const failClose = document.querySelector('.close-btn-fail')
if(successClose) {
    successClose.addEventListener('click', () => {
        document.querySelector('.success-toast').classList.add('close')
      })
}

if(failClose) {
    failClose.addEventListener('click', () => {
        document.querySelector('.fail-toast').classList.add('close')
      })
}

// Get all navigation links in the mobile menu
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Function to handle smooth navigation
function handleMobileNavigation(e) {
    // Only handle links that navigate to other pages (not tel: links)
    if (!e.target.href.startsWith('tel:')) {
        e.preventDefault(); // Prevent immediate navigation
        const targetHref = e.target.href;
        
        // Toggle menu closed
        mobileMenu.classList.remove('is-active');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';

        // Wait for the menu closing animation to complete
        // The CSS transition is 0.3s, so we wait slightly longer
        setTimeout(() => {
            window.location.href = targetHref;
        }, 600); // Match this with your CSS transition duration
    }
}

// Add click event listeners to all mobile menu links
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', handleMobileNavigation);
});

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu .hamburger');

function toggleMenu() {
    mobileMenu.classList.toggle('is-active');
    overlay.classList.toggle('is-active');
    document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
mobileMenuClose.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);


