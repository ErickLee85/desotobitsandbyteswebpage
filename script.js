document.addEventListener('DOMContentLoaded', function() {
    
    const nav = document.querySelector('nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
 
    const slides = document.querySelectorAll('.metric-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    function updateSlides() {
        if (!slides.length) return; // Guard clause for when elements don't exist
        
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
            } else if (index < currentSlide) {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(-100%)';
                slide.style.opacity = '0';
            } else {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
            }
        });

        // Update button states
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === slides.length - 1;
        }
    }

    // Initialize button states
    if (prevBtn) {
        prevBtn.disabled = true;
    }

    // Add button event listeners with touch support
    if (nextBtn) {
        ['click', 'touchend'].forEach(evt => 
            nextBtn.addEventListener(evt, (e) => {
                e.preventDefault();
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    updateSlides();
                }
            })
        );
    }

    if (prevBtn) {
        ['click', 'touchend'].forEach(evt => 
            prevBtn.addEventListener(evt, (e) => {
                e.preventDefault();
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlides();
                }
            })
        );
    }

    // Chart configuration
    const options = {
        series: [100, 99, 99, 100],
        chart: {
            height: 500, // Reduced height for mobile
            type: 'radialBar',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent'
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                    }
                },
                barLabels: {
                    enabled: true,
                    useSeriesColors: true,
                    offsetX: -8,
                    fontSize: '14px', // Smaller font for mobile
                    formatter: function(seriesName, opts) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
                    },
                }
            }
        },
        colors: ['#00C853', '#2979FF', '#FF6D00', '#AA00FF'],
        labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'],
        legend: {
            show: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 300 // Even smaller for mobile
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '25%'
                        }
                    }
                }
            }
        }]
    };

    let chart = null;
    
    function initializeChart() {
        const chartElement = document.querySelector('#metrics-radar');
        if (!chartElement) return;
        
        if (chart) {
            chart.destroy();
        }
        
        chart = new ApexCharts(chartElement, options);
        chart.render().catch(err => console.error('Chart render error:', err));
    }

    // Initialize chart when element is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeChart();
                // Once initialized, disconnect observer
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.1 // Lower threshold for mobile
    });

    const chartElement = document.querySelector('#metrics-radar');
    if (chartElement) {
        observer.observe(chartElement);
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (chart) {
                initializeChart(); // Reinitialize chart on resize
            }
        }, 250);
    });
});

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


