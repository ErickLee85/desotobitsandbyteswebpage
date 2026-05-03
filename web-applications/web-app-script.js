// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// Contact Form Handler


// GSAP Animations for Web Hero Section
window.addEventListener('load', () => {
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueGradient = revenueCtx.createLinearGradient(0, 0, 0, 200);
        revenueGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
        revenueGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'Revenue',
                    data: [520000, 540000, 580000, 590000, 650000, 670000, 750000, 760000, 847392],
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: revenueGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: 'rgb(99, 102, 241)',
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleColor: 'rgba(255, 255, 255, 0.8)',
                        bodyColor: 'white',
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    // (GSAP entrance/scroll animations removed — only functional handlers retained)

    // Learn-more click handler
    const webLearnMore = document.querySelector('.web-learn-more');
    if (webLearnMore) {
        webLearnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const webAppFeaturesSection = document.querySelector('#web-app-features-section') || document.querySelector('.web-app-features-section');
            if (webAppFeaturesSection) {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                    try {
                        smoother.scrollTo(webAppFeaturesSection, true, 'center center');
                    } catch (error) {
                        webAppFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    webAppFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Initialize first review card (functional carousel state)
    const webReviewsSection = document.querySelector('.web-reviews-section');
    if (webReviewsSection) {
        const webReviewCards = webReviewsSection.querySelectorAll('.web-review-card');
        if (webReviewCards.length > 0) {
            webReviewCards[0].classList.add('active');
        }
    }
});

