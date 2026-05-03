// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// (Entrance/scroll animations removed — only functional handlers retained)
window.addEventListener('load', () => {
    // Initialize Prism for code highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // Learn-more click handler (entrance animations removed)
    const apiLearnMore = document.querySelector('.api-learn-more');
    if (apiLearnMore) {
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

    // Initialize first review card (functional carousel state)
    const apiReviewsSection = document.querySelector('.api-reviews-section');
    if (apiReviewsSection) {
        const apiReviewCards = apiReviewsSection.querySelectorAll('.api-review-card');
        if (apiReviewCards.length > 0) {
            apiReviewCards[0].classList.add('active');
        }
    }
});
