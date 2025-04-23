// GSAP animations for Desoto Bits & Bytes website
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        gsap.from('.hero-text-container > *', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        gsap.from('.hero-img', {
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power2.out'
        });
          // Services section animations
        gsap.from('.services-header > *', {
            scrollTrigger: {
                trigger: '.services-section',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        // Make sure service cards are visible by default
        gsap.set('.service-card', {opacity: 1, y: 0});
        
        // Then animate them
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
        
        // Case study animations
        document.querySelectorAll('.case-study-section').forEach((section, index) => {
            const content = section.querySelector('.case-study-content');
            const header = section.querySelector('.case-study-header');
            const image = section.querySelector('.case-study-image');
            const details = section.querySelector('.case-study-details');
            const results = section.querySelectorAll('.result-item');
            
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.7,
                stagger: 0.2,
                ease: 'power2.out'
            });
            
            if (image) {
                gsap.from(image, {
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 80%'
                    },
                    x: index % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power2.out'
                });
            }
            
            gsap.from(details.children, {
                scrollTrigger: {
                    trigger: content,
                    start: 'top 80%'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
            
            gsap.from(results, {
                scrollTrigger: {
                    trigger: results,
                    start: 'top 90%'
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });
        
        // Contact section animations
        gsap.from('.contact-text > *', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
        
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%'
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out'
        });
        
        // Testimonials animations
        gsap.from('.reviews-header > *', {
            scrollTrigger: {
                trigger: '.reviews-section',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials-track',
                start: 'top 85%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });
        
        // Blog section animations
        gsap.from('.latest-blog-header > *', {
            scrollTrigger: {
                trigger: '.latest-blog-section',
                start: 'top 80%'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        gsap.from('.blog-card', {
            scrollTrigger: {
                trigger: '.latest-blog-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Footer animations
        gsap.from('.footer-content > div', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 85%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }
});
