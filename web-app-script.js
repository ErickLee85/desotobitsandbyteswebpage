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
    // Animate hero subtitle
    const webHeroSubtitle = document.querySelector('.web-hero-subtitle');
    if (webHeroSubtitle) {
        gsap.fromTo(webHeroSubtitle, {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)'
        }, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
    }

    // Animate hero title with SplitText
    const webHeroTitle = document.querySelector('.web-hero-title');
    if (webHeroTitle) {
        const splitTitle = SplitText.create(webHeroTitle, { type: "words" });
        gsap.fromTo(splitTitle.words, {
            opacity: 0,
            y: 50,
            filter: 'blur(10px)'
        }, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.1,
            delay: 0.8,
            ease: 'power3.out'
        });
    }

    // Animate hero subtext
    const webHeroSubtext = document.querySelector('.web-hero-subtext');
    if (webHeroSubtext) {
        gsap.fromTo(webHeroSubtext, {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)'
        }, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            delay: 1.5,
            ease: 'power3.out'
        });
    }

    // Animate hero CTAs
    const webCta = document.querySelector('.web-cta');
    const webLearnMore = document.querySelector('.web-learn-more');
    
    if (webCta) {
        gsap.fromTo(webCta, {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)'
        }, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: 2,
            ease: 'power3.out'
        });
    }

    if (webLearnMore) {
        gsap.fromTo(webLearnMore, {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)'
        }, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            delay: 2.2,
            ease: 'power3.out'
        });
    }

    // Dashboard Container Scroll Animation
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        // Set initial state using GSAP transform properties
        // Use transformOrigin to prevent smushing and maintain proper 3D perspective
        gsap.set(dashboardContainer, {
            
        });

        // Create scroll-triggered timeline
        const dashboardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: dashboardContainer,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play none none none',
            }
        });

        dashboardTimeline.to(dashboardContainer, {
            filter:'blur(0px)',
            opacity:1,
            y:-150,
            ease: 'power2.out'
        });
    }

    // Web App Features Section Animations
    const webAppFeaturesSection = document.querySelector('.web-app-features-section');
    if (webAppFeaturesSection) {
        // Animate heading
        const featuresHeading = webAppFeaturesSection.querySelector('h2');
        if (featuresHeading) {
            const splitFeaturesHeading = SplitText.create(featuresHeading, { type: "words" });
            gsap.fromTo(splitFeaturesHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: featuresHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate paragraph
        const featuresParagraph = webAppFeaturesSection.querySelector('p');
        if (featuresParagraph) {
            gsap.fromTo(featuresParagraph, {
                opacity: 0,
                y: 30,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: featuresParagraph,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate feature items
        const webAppFeatureItems = webAppFeaturesSection.querySelectorAll('.web-app-feature-item');
        if (webAppFeatureItems.length > 0) {
            gsap.set(webAppFeatureItems, {
                x: -50,
                opacity: 0
            });

            gsap.to(webAppFeatureItems, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: webAppFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate image
        const webAppFeaturesImage = webAppFeaturesSection.querySelector('.web-app-features-image');
        if (webAppFeaturesImage) {
            gsap.fromTo(webAppFeaturesImage, {
                opacity: 0,
                scale: 0.9
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                scrollTrigger: {
                    trigger: webAppFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }

    // Web Reviews Section Animations
    const webReviewsSection = document.querySelector('.web-reviews-section');
    if (webReviewsSection) {
        // Animate reviews heading
        const webReviewsHeading = webReviewsSection.querySelector('.web-reviews-heading');
        if (webReviewsHeading) {
            const splitWebReviewsHeading = SplitText.create(webReviewsHeading, { type: "words" });
            gsap.fromTo(splitWebReviewsHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: webReviewsHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate review container
        const webReviewContainer = webReviewsSection.querySelector('.web-reviews-container');
        if (webReviewContainer) {
            gsap.fromTo(webReviewContainer, {
                opacity: 0,
                y: 50,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                delay: 0.8,
                scrollTrigger: {
                    trigger: webReviewContainer,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Initialize first review card
        const webReviewCards = webReviewsSection.querySelectorAll('.web-review-card');
        if (webReviewCards.length > 0) {
            webReviewCards[0].classList.add('active');
            gsap.set(webReviewCards[0], { opacity: 1, filter: 'blur(0px)' });
        }
    }

    // Web FAQ Section Animations
    const webFaqSection = document.querySelector('.web-faq-section');
    if (webFaqSection) {
        // Animate FAQ heading
        const webFaqHeading = webFaqSection.querySelector('.web-faq-heading');
        if (webFaqHeading) {
            const splitWebFaqHeading = SplitText.create(webFaqHeading, { type: "words" });
            gsap.fromTo(splitWebFaqHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: webFaqHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate FAQ items
        const webFaqItems = webFaqSection.querySelectorAll('.web-faq-item');
        if (webFaqItems.length > 0) {
            gsap.set(webFaqItems, {
                opacity: 0,
                y: 30
            });

            gsap.to(webFaqItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: webFaqSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }
});

