// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// GSAP Animations for AI Hero Section
window.addEventListener('load', () => {
    // Animate hero subtitle
    const aiHeroSubtitle = document.querySelector('.ai-hero-subtitle');
    if (aiHeroSubtitle) {
        gsap.fromTo(aiHeroSubtitle, {
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
    const aiHeroTitle = document.querySelector('.ai-hero-title');
    if (aiHeroTitle) {
        const splitTitle = SplitText.create(aiHeroTitle, { type: "words" });
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
    const aiHeroSubtext = document.querySelector('.ai-hero-subtext');
    if (aiHeroSubtext) {
        gsap.fromTo(aiHeroSubtext, {
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
    const aiCta = document.querySelector('.ai-cta');
    const aiLearnMore = document.querySelector('.ai-learn-more');
    
    if (aiCta) {
        gsap.fromTo(aiCta, {
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

    if (aiLearnMore) {
        gsap.fromTo(aiLearnMore, {
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

        // Add click handler to scroll to next section
        aiLearnMore.addEventListener('click', (e) => {
            e.preventDefault();
            const nextSection = document.querySelector('.ai-features-section') || document.querySelector('#ai-features-section');
            if (nextSection) {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                    try {
                        smoother.scrollTo(nextSection, true, 'center center');
                    } catch (error) {
                        nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    const dashboardContainer = document.querySelector('.ai-dashboard');
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
});

// Dynamic Greeting Based on Time
function updateGreeting() {
    const greetingElement = document.getElementById('greeting-time');
    if (!greetingElement) return;

    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour >= 0 && hour < 6) {
        greeting = "Up Late";
    } else if (hour >= 6 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    greetingElement.textContent = greeting;
}

// Update greeting on load
updateGreeting();

// User Dropdown Toggle with GSAP Animation
const userDropdownToggle = document.getElementById('userDropdownToggle');
const userDropdown = document.getElementById('userDropdown');
let isDropdownOpen = false;

if (userDropdownToggle && userDropdown) {
    // Set initial state
    gsap.set(userDropdown, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transformOrigin: 'top right'
    });

    userDropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;

        if (isDropdownOpen) {
            // Open animation
            userDropdownToggle.classList.add('active');
            userDropdown.classList.add('active');
            
            gsap.to(userDropdown, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(1.7)'
            });

            // Animate dropdown items
            const items = userDropdown.querySelectorAll('.user-dropdown-item');
            gsap.fromTo(items, 
                {
                    scale:0.95
                },
                {
                    scale:1,
                    duration: 0.3,
                    stagger: 0.08,
                    delay: 0.1,
                    ease: 'power2.out'
                }
            );
        } else {
            // Close animation
            gsap.to(userDropdown, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    userDropdownToggle.classList.remove('active');
                    userDropdown.classList.remove('active');
                }
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (isDropdownOpen && !userDropdown.contains(e.target) && !userDropdownToggle.contains(e.target)) {
            isDropdownOpen = false;
            gsap.to(userDropdown, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    userDropdownToggle.classList.remove('active');
                    userDropdown.classList.remove('active');
                }
            });
        }
    });

    // Handle dropdown item clicks
    const dropdownItems = userDropdown.querySelectorAll('.user-dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const option = item.getAttribute('data-option');
            
            // Add click animation
            gsap.to(item, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });

            // Handle different options
            setTimeout(() => {
                switch(option) {
                    case 'profile':
                        console.log('Profile clicked');
                        // Add your profile logic here
                        break;
                    case 'settings':
                        console.log('Settings clicked');
                        // Add your settings logic here
                        break;
                    case 'logout':
                        console.log('Logout clicked');
                        // Add your logout logic here
                        break;
                }
            }, 200);
        });

        // Hover effect
        // item.addEventListener('mouseenter', () => {
        //     gsap.to(item, {
        //         x: 5,
        //         duration: 0.2,
        //         ease: 'power2.out'
        //     });
        // });

        // item.addEventListener('mouseleave', () => {
        //     gsap.to(item, {
        //         x: 0,
        //         duration: 0.2,
        //         ease: 'power2.out'
        //     });
        // });
    });
}
