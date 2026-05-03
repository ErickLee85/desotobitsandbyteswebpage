// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// (GSAP entrance/scroll animations removed — only functional handlers retained)
window.addEventListener('load', () => {
    // Learn-more click handler
    const companyLearnMore = document.querySelector('.company-learn-more');
    if (companyLearnMore) {
        companyLearnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const companyFeaturesSection = document.querySelector('#company-features-section') || document.querySelector('.company-features-section');
            if (companyFeaturesSection) {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                    try {
                        smoother.scrollTo(companyFeaturesSection, true, 'center center');
                    } catch (error) {
                        companyFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    companyFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // Initialize first review card (functional carousel state)
    const companyReviewsSection = document.querySelector('.company-reviews-section');
    if (companyReviewsSection) {
        const companyReviewCards = companyReviewsSection.querySelectorAll('.company-review-card');
        if (companyReviewCards.length > 0) {
            companyReviewCards[0].classList.add('active');
        }
    }
});
