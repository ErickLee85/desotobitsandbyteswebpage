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

    // Initialize buttons state
    prevBtn.disabled = true;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';
            } else if (index < currentSlide) {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(-100%)';
            } else {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(100%)';
            }
        });

        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });

    // Chart configuration
    const options = {
        series: [100, 99, 99, 100],
        chart: {
            height: 500,
            type: 'radialBar',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            events: {
                mounted: function(chartContext, config) {
                    const defaultLabel = document.querySelector('.apexcharts-datalabel-label');
                    if (defaultLabel) {
                        defaultLabel.textContent = 'Performance';
                    }
                },
                dataPointMouseEnter: function(event, chartContext, config) {
                    const label = config.w.config.labels[config.dataPointIndex];
                    const labelElement = document.querySelector('.apexcharts-datalabel-label');
                    if (labelElement) {
                        labelElement.textContent = label;
                    }
                },
                dataPointMouseLeave: function(event, chartContext, config) {
                    const labelElement = document.querySelector('.apexcharts-datalabel-label');
                    if (labelElement) {
                        labelElement.textContent = 'Performance';
                    }
                }
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
                    background: 'transparent',
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '16px',
                        offsetY: 30
                    },
                    value: {
                        show: true,
                        fontSize: '24px',
                        offsetY: -10,
                        formatter: function(val) {
                            return val + '%';
                        }
                    }
                },
                track: {
                    background: '#f2f2f2',
                    strokeWidth: '100%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.15
                    }
                }
            }
        },
        colors: ['#00C853', '#2979FF', '#FF6D00', '#AA00FF'],
        labels: ['Performance', 'Accessibility', 'Best Practices', 'SEO'],
        legend: {
            show: true,
            fontSize: '14px',
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            offsetX: 0,
            offsetY: 0,
            formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
            }
        },
        responsive: [{
            breakpoint: 1024,
            options: {
                chart: {
                    height: 400
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                    offsetX: 0,
                    offsetY: 0,
                    horizontalAlign: 'center',
                    itemMargin: {
                        horizontal: 5,
                        vertical: 10
                    }
                }
            }
        }, {
            breakpoint: 768,
            options: {
                chart: {
                    height: 350
                },
                legend: {
                    position: 'bottom',
                    fontSize: '11px',
                    formatter: function(seriesName, opts) {
                        return seriesName + ": " + opts.w.globals.series[opts.seriesIndex] + "%";
                    },
                    itemMargin: {
                        horizontal: 4,
                        vertical: 8
                    }
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '25%'
                        },
                        dataLabels: {
                            name: {
                                fontSize: '14px',
                                offsetY: 25
                            },
                            value: {
                                fontSize: '20px',
                                offsetY: -15
                            }
                        }
                    }
                }
            }
        }]
    };

    let chart = null;

    // Function to initialize or reinitialize the chart
    // function initializeChart() {
    //     const chartElement = document.querySelector('#metrics-radar');
    //     if (!chartElement) return;

    //     // If chart exists, destroy it first
    //     if (chart) {
    //         chart.destroy();
    //     }

    //     // Create new chart instance
       
    // }

    // Initialize chart when element is visible
    // const observerOptions = {
    //     root: null,
    //     rootMargin: '0px',
    //     threshold: 0.3
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             initializeChart();
    //         }
    //     });
    // }, observerOptions);

    // Start observing the chart container
    // const chartElement = document.querySelector('#metrics-radar');
    // if (chartElement) {
    //     observer.observe(chartElement);
    // }
    chart = new ApexCharts(chartElement, options);
    chart.render();

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            const chartElement = document.querySelector('#metrics-radar');
            if (chartElement) {
                initializeChart();
            }
        }
    });

    // Optional: Handle page show event (when navigating back)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            const chartElement = document.querySelector('#metrics-radar');
            if (chartElement) {
                initializeChart();
            }
        }
    });
    
});

    const form = document.querySelector('.my-form');
    const submitBtn = document.querySelector('.form-submit-btn')
    const successToast = document.querySelector('.success-toast')
    const failToast = document.querySelector('.fail-toast')
    const closeTimer = document.querySelector('.close-timer');
    const closeTimerFail = document.querySelector('.close-timer-fail');
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

const successClose = document.querySelector('.close-btn-success');
const failClose = document.querySelector('.close-btn-fail')
successClose.addEventListener('click', () => {
  document.querySelector('.success-toast').classList.add('close')
})

failClose.addEventListener('click', () => {
  document.querySelector('.fail-toast').classList.add('close')
})

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


