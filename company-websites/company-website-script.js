// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// GSAP Animations for Company Hero Section
window.addEventListener('load', () => {
    // Animate hero subtitle
    const companyHeroSubtitle = document.querySelector('.company-hero-subtitle');
    if (companyHeroSubtitle) {
        gsap.fromTo(companyHeroSubtitle, {
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
    const companyHeroTitle = document.querySelector('.company-hero-title');
    if (companyHeroTitle) {
        const splitTitle = SplitText.create(companyHeroTitle, { type: "words" });
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
    const companyHeroSubtext = document.querySelector('.company-hero-subtext');
    if (companyHeroSubtext) {
        gsap.fromTo(companyHeroSubtext, {
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
    const companyCta = document.querySelector('.company-cta');
    const companyLearnMore = document.querySelector('.company-learn-more');
    
    if (companyCta) {
        gsap.fromTo(companyCta, {
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

    if (companyLearnMore) {
        gsap.fromTo(companyLearnMore, {
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
        companyLearnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const companyFeaturesSection = document.querySelector('#company-features-section') || document.querySelector('.company-features-section');
            if (companyFeaturesSection) {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                    try {
                        smoother.scrollTo(companyFeaturesSection, true, 'center center');
                    } catch (error) {
                        // Fallback if ScrollSmoother fails
                        companyFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    companyFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Hero Sample Container Scroll Animation
    const heroSampleContainer = document.querySelector('.hero-sample');
    if (heroSampleContainer) {
        // Create scroll-triggered timeline
        const heroSampleTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: heroSampleContainer,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play none none none',
            }
        });

        heroSampleTimeline.to(heroSampleContainer, {
            filter:'blur(0px)',
            opacity:1,
            y:-150,
            ease: 'power2.out'
        });
    }

    // Company Features Section Animations
    const companyFeaturesSection = document.querySelector('.company-features-section');
    if (companyFeaturesSection) {
        // Animate heading
        const featuresHeading = companyFeaturesSection.querySelector('h2');
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
        const featuresParagraph = companyFeaturesSection.querySelector('p');
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
        const companyFeatureItems = companyFeaturesSection.querySelectorAll('.company-feature-item');
        if (companyFeatureItems.length > 0) {
            gsap.set(companyFeatureItems, {
                x: -50,
                opacity: 0
            });

            gsap.to(companyFeatureItems, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: companyFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate image
        const companyFeaturesImage = companyFeaturesSection.querySelector('.company-features-image');
        if (companyFeaturesImage) {
            gsap.fromTo(companyFeaturesImage, {
                opacity: 0,
                scale: 0.9
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                scrollTrigger: {
                    trigger: companyFeaturesSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }

    // Company Reviews Section Animations
    const companyReviewsSection = document.querySelector('.company-reviews-section');
    if (companyReviewsSection) {
        // Animate reviews heading
        const companyReviewsHeading = companyReviewsSection.querySelector('.company-reviews-heading');
        if (companyReviewsHeading) {
            const splitCompanyReviewsHeading = SplitText.create(companyReviewsHeading, { type: "words" });
            gsap.fromTo(splitCompanyReviewsHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: companyReviewsHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate review container
        const companyReviewContainer = companyReviewsSection.querySelector('.company-reviews-container');
        if (companyReviewContainer) {
            gsap.fromTo(companyReviewContainer, {
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
                    trigger: companyReviewContainer,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Initialize first review card
        const companyReviewCards = companyReviewsSection.querySelectorAll('.company-review-card');
        if (companyReviewCards.length > 0) {
            companyReviewCards[0].classList.add('active');
            gsap.set(companyReviewCards[0], { opacity: 1, filter: 'blur(0px)' });
        }
    }

    // Company FAQ Section Animations
    const companyFaqSection = document.querySelector('.company-faq-section');
    if (companyFaqSection) {
        // Animate FAQ heading
        const companyFaqHeading = companyFaqSection.querySelector('.company-faq-heading');
        if (companyFaqHeading) {
            const splitCompanyFaqHeading = SplitText.create(companyFaqHeading, { type: "words" });
            gsap.fromTo(splitCompanyFaqHeading.words, {
                opacity: 0,
                filter: 'blur(10px)'
            }, {
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: companyFaqHeading,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animate FAQ items
        const companyFaqItems = companyFaqSection.querySelectorAll('.company-faq-item');
        if (companyFaqItems.length > 0) {
            gsap.set(companyFaqItems, {
                opacity: 0,
                y: 30
            });

            gsap.to(companyFaqItems, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: companyFaqSection,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }
    }
});
