// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// (GSAP entrance/scroll animations removed — only functional handlers retained)
window.addEventListener('load', () => {
    // Learn-more click handler
    const aiLearnMore = document.querySelector('.ai-learn-more');
    if (aiLearnMore) {
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
