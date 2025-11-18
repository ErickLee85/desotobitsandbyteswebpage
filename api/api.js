// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// GSAP Animations for API Hero Section
window.addEventListener('load', () => {
    // Initialize Prism for code highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Animate hero subtitle
    const apiHeroSubtitle = document.querySelector('.api-hero-subtitle');
    if (apiHeroSubtitle) {
        gsap.fromTo(apiHeroSubtitle, {
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
    const apiHeroTitle = document.querySelector('.api-hero-title');
    if (apiHeroTitle) {
        const splitTitle = SplitText.create(apiHeroTitle, { type: "words" });
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
    const apiHeroSubtext = document.querySelector('.api-hero-subtext');
    if (apiHeroSubtext) {
        gsap.fromTo(apiHeroSubtext, {
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
    const apiCta = document.querySelector('.api-cta');
    const apiLearnMore = document.querySelector('.api-learn-more');
    
    if (apiCta) {
        gsap.fromTo(apiCta, {
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

    if (apiLearnMore) {
        gsap.fromTo(apiLearnMore, {
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

        // Add click handler to scroll to features section
        apiLearnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const apiFeaturesSection = document.querySelector('#api-features-section') || document.querySelector('.api-features-section');
            if (apiFeaturesSection) {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                    try {
                        smoother.scrollTo(apiFeaturesSection, true, 'center center');
                    } catch (error) {
                        apiFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    apiFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Code Demo Container Scroll Animation
    const codeDemoContainer = document.querySelector('.code-demo-container');
    if (codeDemoContainer) {
        const codeDemoTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: codeDemoContainer,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play none none none',
            }
        });

        codeDemoTimeline.to(codeDemoContainer, {
            y:-150,
            ease: 'power2.out'
        });
    }

    // API Features Section Animations
    const apiFeaturesSection = document.querySelector('.api-features-section');
    if (apiFeaturesSection) {
        // Animate heading
        const featuresHeading = apiFeaturesSection.querySelector('h2');
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
        const featuresParagraph = apiFeaturesSection.querySelector('p');
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
        const apiFeatureItems = apiFeaturesSection.querySelectorAll('.api-feature-item');
        if (apiFeatureItems.length > 0) {
            gsap.set(apiFeatureItems, {
                x: -50,
                opacity: 0
            });

            gsap.to(apiFeatureItems, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: apiFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate image
        const apiFeaturesImage = apiFeaturesSection.querySelector('.api-features-image');
        if (apiFeaturesImage) {
            gsap.fromTo(apiFeaturesImage, {
                opacity: 0,
                scale: 0.9
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                scrollTrigger: {
                    trigger: apiFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }

    // API Reviews Section Animations
    const apiReviewsSection = document.querySelector('.api-reviews-section');
    if (apiReviewsSection) {
        // Animate reviews heading
        const apiReviewsHeading = apiReviewsSection.querySelector('.api-reviews-heading');
        if (apiReviewsHeading) {
            const splitApiReviewsHeading = SplitText.create(apiReviewsHeading, { type: "words" });
            gsap.fromTo(splitApiReviewsHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: apiReviewsHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate review container
        const apiReviewContainer = apiReviewsSection.querySelector('.api-reviews-container');
        if (apiReviewContainer) {
            gsap.fromTo(apiReviewContainer, {
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
                    trigger: apiReviewContainer,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Initialize first review card
        const apiReviewCards = apiReviewsSection.querySelectorAll('.api-review-card');
        if (apiReviewCards.length > 0) {
            apiReviewCards[0].classList.add('active');
            gsap.set(apiReviewCards[0], { opacity: 1, filter: 'blur(0px)' });
        }
    }

    // API FAQ Section Animations
    const apiFaqSection = document.querySelector('.api-faq-section');
    if (apiFaqSection) {
        // Animate FAQ heading
        const apiFaqHeading = apiFaqSection.querySelector('.api-faq-heading');
        if (apiFaqHeading) {
            const splitApiFaqHeading = SplitText.create(apiFaqHeading, { type: "words" });
            gsap.fromTo(splitApiFaqHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: apiFaqHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate FAQ items
        const apiFaqItems = apiFaqSection.querySelectorAll('.api-faq-item');
        if (apiFaqItems.length > 0) {
            gsap.set(apiFaqItems, {
                opacity: 0,
                y: 30
            });

            gsap.to(apiFaqItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: apiFaqSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }
});
