 gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin);

        // ── Speculation Rules API ─────────────────────────────────────────
        // Prerenders same-origin pages on hover (~200ms intent) for instant navigation.
        // Falls back to prefetch on pointerdown for browsers that support prefetch but not prerender.
        // Non-supporting browsers silently ignore this — zero cost.
        if (HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
            const specScript = document.createElement('script');
            specScript.type = 'speculationrules';
            specScript.textContent = JSON.stringify({
                prerender: [{
                    source: 'document',
                    where: {
                        and: [
                            { href_matches: '/*' },
                            { not: { selector_matches: '[target=_blank], .no-prerender' } }
                        ]
                    },
                    eagerness: 'moderate'
                }],
                prefetch: [{
                    source: 'document',
                    where: {
                        and: [
                            { href_matches: '/*' },
                            { not: { selector_matches: '[target=_blank]' } }
                        ]
                    },
                    eagerness: 'conservative'
                }]
            });
            document.head.appendChild(specScript);
        }

        // Turnstile State Management
        const turnstileState = {};
        const TURNSTILE_SITE_KEY = '0x4AAAAAACCREQrrdh14nsL1';
        let turnstileInitialized = false;

        // Initialize Turnstile widgets
        function initializeTurnstile() {
            if (turnstileInitialized) return;
            
            if (typeof turnstile === 'undefined') {
                setTimeout(initializeTurnstile, 500);
                return;
            }
            
            turnstileInitialized = true;

            // Initialize for getInTouchForm
            const getInTouchTurnstile = document.getElementById('getInTouchTurnstile');
            if (getInTouchTurnstile && !turnstileState['getInTouchForm'] && getInTouchTurnstile.children.length === 0) {
                turnstileState['getInTouchForm'] = { token: null, widgetId: null };
                try {
                    turnstileState['getInTouchForm'].widgetId = turnstile.render('#getInTouchTurnstile', {
                        sitekey: TURNSTILE_SITE_KEY,
                        theme: 'light',
                        callback: (token) => { turnstileState['getInTouchForm'].token = token; },
                        'expired-callback': () => { turnstileState['getInTouchForm'].token = null; },
                        'error-callback': () => { turnstileState['getInTouchForm'].token = null; }
                    });
                } catch (e) { console.warn('Turnstile render error:', e); }
            }

            // Initialize for contactForm overlay
            const contactFormTurnstile = document.getElementById('contactFormTurnstile');
            if (contactFormTurnstile && !turnstileState['contactForm'] && contactFormTurnstile.children.length === 0) {
                turnstileState['contactForm'] = { token: null, widgetId: null };
                try {
                    turnstileState['contactForm'].widgetId = turnstile.render('#contactFormTurnstile', {
                        sitekey: TURNSTILE_SITE_KEY,
                        theme: 'light',
                        callback: (token) => { turnstileState['contactForm'].token = token; },
                        'expired-callback': () => { turnstileState['contactForm'].token = null; },
                        'error-callback': () => { turnstileState['contactForm'].token = null; }
                    });
                } catch (e) { console.warn('Turnstile render error:', e); }
            }
        }

        // Reset Turnstile widget for a specific form
        function resetTurnstileForForm(formId) {
            if (turnstileState[formId] && turnstileState[formId].widgetId !== null && typeof turnstile !== 'undefined') {
                turnstile.reset(turnstileState[formId].widgetId);
                turnstileState[formId].token = null;
            }
        }

        // Form submission handlers
        async function submitContactForm(contactForm) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Check Turnstile token
                const turnstileToken = turnstileState['contactForm']?.token;
                if (!turnstileToken) {
                    alert('Please complete the security check before submitting.');
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnText;
                    return;
                }

                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                data.turnstileToken = turnstileToken;
                
                // Send to API
                const response = await fetch('https://dbb-node-server.vercel.app/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    var count = 200;
                    var defaults = {
                    origin: { y: 0.7 }
                    };
        
                    function fire(particleRatio, opts) {
                    confetti({
                        ...defaults,
                        ...opts,
                        particleCount: Math.floor(count * particleRatio)
                    });
                    }
        
                    fire(0.25, {
                    spread: 26,
                    startVelocity: 55,
                    });
                    fire(0.2, {
                    spread: 60,
                    });
                    fire(0.35, {
                    spread: 100,
                    decay: 0.91,
                    scalar: 0.8
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 25,
                    decay: 0.92,
                    scalar: 1.2
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 45,
                    });
                    contactForm.reset();
                    resetTurnstileForForm('contactForm');
                    // Close the contact form overlay
                    const contactOverlay = document.getElementById('contactOverlay');
                    if (contactOverlay) {
                        contactOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                        // Reset panel position
                        const contactFormPanel = document.getElementById('contactFormPanel');
                        if (contactFormPanel) {
                            gsap.set(contactFormPanel, { x: '100%' });
                            gsap.set(contactOverlay, { opacity: 0 });
                        }
                    }
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnText;
            }
        }
        
        async function submitGetInTouchForm(getInTouchForm) {
            const submitBtn = getInTouchForm.querySelector('.btn-touch-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Check Turnstile token
                const turnstileToken = turnstileState['getInTouchForm']?.token;
                if (!turnstileToken) {
                    alert('Please complete the security check before submitting.');
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.innerHTML = originalBtnText;
                    return;
                }

                // Get form data
                const formData = new FormData(getInTouchForm);
                const data = Object.fromEntries(formData);
                data.turnstileToken = turnstileToken;
                
                // Send to API
                const response = await fetch('https://dbb-node-server.vercel.app/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    var count = 200;
                    var defaults = {
                    origin: { y: 0.7 }
                    };
        
                    function fire(particleRatio, opts) {
                    confetti({
                        ...defaults,
                        ...opts,
                        particleCount: Math.floor(count * particleRatio)
                    });
                    }
        
                    fire(0.25, {
                    spread: 26,
                    startVelocity: 55,
                    });
                    fire(0.2, {
                    spread: 60,
                    });
                    fire(0.35, {
                    spread: 100,
                    decay: 0.91,
                    scalar: 0.8
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 25,
                    decay: 0.92,
                    scalar: 1.2
                    });
                    fire(0.1, {
                    spread: 120,
                    startVelocity: 45,
                    });
                    getInTouchForm.reset();
                    resetTurnstileForForm('getInTouchForm');
                } else {
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnText;
            }
        }

        // Detect mobile/touch devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                        (window.innerWidth <= 943) || 
                        ('ontouchstart' in window);

        // Global smoother variable
        let smoother = null;

        // Hero animations on load with SplitText
        window.addEventListener('load', () => {
            // Initialize Turnstile widgets
            initializeTurnstile();
            
            // Split the tagline text
          
                const infoBtn = document.querySelector('.btn-secondary')
              
                /*let words = document.querySelectorAll(".trusted-logo")*/
                
                // Only create ScrollSmoother on desktop devices
                const smoothWrapper = document.getElementById('smooth-wrapper');
                const smoothContent = document.getElementById('smooth-content');
                if (!isMobile && smoothWrapper && smoothContent) {
                    smoother = ScrollSmoother.create({
                        wrapper:'#smooth-wrapper',
                        content:'#smooth-content',
                        smoother:1
                    });
                    // Refresh ScrollTrigger after ScrollSmoother is created
                  
                } else {
                    // On mobile, add a class to enable normal scrolling
                    if (smoothWrapper) {
                        smoothWrapper.classList.add('mobile-scroll');
                    }
                }

                const mobileLearnMore = document.querySelector('.mobile-learn-more');
                if (mobileLearnMore) {
                    mobileLearnMore.addEventListener('click',(e) => {
                        e.preventDefault();
                        const mobileAppFeaturesSection = document.querySelector('#mobile-app-features-section') || document.querySelector('.mobile-app-features-section');
                        if (mobileAppFeaturesSection) {
                            if (smoother) {
                                try {
                                    smoother.scrollTo(mobileAppFeaturesSection, true, 'center center');
                                } catch (error) {
                                    // Fallback if ScrollSmoother fails
                                    mobileAppFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            } else {
                                mobileAppFeaturesSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    });
                }

                if (infoBtn) {
                    infoBtn.addEventListener('click',(e) => {
                        e.preventDefault();
                        const statsSection = document.querySelector(".stats-section");
                        if (statsSection) {
                            if (smoother) {
                                smoother.scrollTo(".stats-section", true, "top top");
                            } else {
                                // Fallback for mobile
                                statsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    });
                }
            
                        // Hero CTA animation
                        // const heroCta = document.querySelector(".hero-cta");
                        // if (heroCta) {
                        //     gsap.fromTo([".hero-cta"],{y:20,opacity:0},{y:0,opacity:1,duration:1,delay:1.5});
                        // }
                        
                     });

                     // Services Section - Static display with SVG heading animation
                    const servicesHeading = document.querySelector('.services-heading');
                    
                    // Animate the SVG text paths with DrawSVG (handwriting effect)
                    if (servicesHeading) {
                        const servicePaths = servicesHeading.querySelectorAll('.services-path');
                        
                        // Set initial state
                        gsap.set(servicePaths, { drawSVG: '0% 0%' });
                        
                        // Animate drawing in
                        gsap.to(servicePaths, {
                            drawSVG: '100%',
                            duration: 1.5,
                            stagger: 0.08,
                            scrollTrigger: {
                                trigger: servicesHeading,
                                start: "top 80%",
                                toggleActions: "play none none none",
                                markers: false
                            }
                        });
                    }
                    
                    // (Service card opacity stagger animation removed)

        function smoothScrollTo(element, duration = 800) {
            const startPosition = window.pageYOffset;
            const targetPosition = element.getBoundingClientRect().top + startPosition - 80; // Offset for header
            const distance = targetPosition - startPosition;
            let startTime = null;

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    window.scrollTo(0, targetPosition);
                }
            }

            requestAnimationFrame(animation);
        }

        // Smooth scroll for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        if (anchorLinks.length > 0) {
        anchorLinks.forEach(anchor => {
            // Skip services dropdown triggers
            if (anchor.classList.contains('service-link')) {
                return;
            }
            
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                // Special handling for Home link - scroll to top
                if (href === '#home' || href === '#') {
                    if (isMobile) {
                        // Use native smooth scroll on mobile
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        // Use GSAP ScrollSmoother on desktop
                        if (smoother) {
                            smoother.scrollTo(0, true);
                        } else {
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: 0,
                                ease: 'power3.inOut'
                            });
                        }
                    }
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    // Use different scrolling method based on device
                    if (isMobile) {
                        // Special handling for Services link on mobile - use custom smooth scroll
                        if (href === '#services') {
                            smoothScrollTo(target);
                        } else {
                            // Use native smooth scroll on mobile for other links
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else {
                        // Use GSAP scrollTo on desktop
                        if (smoother) {
                            // Use selector string for ScrollSmoother
                            smoother.scrollTo(href, true, "top top");
                        } else {
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: target,
                                ease: 'power3.inOut'
                            });
                        }
                    }
                }
            });
        });
        }

        // Header hide/show on scroll
        let lastScrollY = 0;
        const navbar = document.querySelector('header');

        if (navbar) {
            ScrollTrigger.create({
                start: 'top top',
                end: 'max',
                onUpdate: (self) => {
                    const currentScrollY = self.scroll();
                    const scrollThreshold = 500;

                    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                        gsap.to(navbar, {
                            y: -100,
                            duration: 0.3,
                        });
                    } else if (currentScrollY < lastScrollY) {
                        gsap.to(navbar, {
                            y: 0,
                            duration: 0.3,
                        });
                    }

                    lastScrollY = currentScrollY;
                }
            });
        }

        // Mobile menu toggle
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu nav a');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking a link
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // Desktop services dropdown toggle
        const desktopServicesLink = document.querySelector('.nav-dropdown > .service-link');
        const navDropdown = document.querySelector('.nav-dropdown');

        if (desktopServicesLink && navDropdown) {
            desktopServicesLink.addEventListener('mouseenter', () => {
                navDropdown.classList.add('active');
            });
            desktopServicesLink.addEventListener('click', (e) => {
                e.preventDefault();
                navDropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!navDropdown.contains(e.target)) {
                    navDropdown.classList.remove('active');
                }
            });

            // Close dropdown when clicking a dropdown item
            const dropdownItems = document.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', () => {
                    navDropdown.classList.remove('active');
                });
            });
        }

         const reviewCards = document.querySelectorAll('.review-card');
         const reviewDots = document.querySelectorAll('.review-dot');
         const reviewNavPrev = document.querySelector('.review-nav-prev');
         const reviewNavNext = document.querySelector('.review-nav-next');
         
         if (reviewCards.length > 0) {
             let currentReview = 0;
             let isReviewAnimating = false;

             function showReview(index) {
                 if (isReviewAnimating || index === currentReview) return;
                 isReviewAnimating = true;

                 const oldCard = reviewCards[currentReview];
                 const newCard = reviewCards[index];

                 // Animate out current card with blur/opacity
                 gsap.to(oldCard, {
                     opacity: 0,
                     filter: 'blur(10px)',
                     duration: 0.6,
                     ease: 'power2.in',
                     onComplete: () => {
                         oldCard.classList.remove('active');
                     }
                 });

                 // Animate in new card with blur/opacity
                 gsap.fromTo(newCard, 
                     { opacity: 0, filter: 'blur(10px)' },
                     { 
                         opacity: 1,
                         filter: 'blur(0px)',
                         duration: 0.6,
                         ease: 'power2.out',
                         delay: 0.1,
                         onComplete: () => {
                             newCard.classList.add('active');
                             isReviewAnimating = false;
                         }
                     }
                 );

                 // Update dots
                 if (reviewDots.length > 0) {
                     reviewDots[currentReview].classList.remove('active');
                     reviewDots[index].classList.add('active');
                 }

                 currentReview = index;
             }

             // Initialize first review
             reviewCards[0].classList.add('active');
             gsap.set(reviewCards[0], { opacity: 1, filter: 'blur(0px)' });

             // Dot navigation
             if (reviewDots.length > 0) {
                 reviewDots.forEach((dot, index) => {
                     dot.addEventListener('click', () => {
                         showReview(index);
                     });
                 });
             }

             // Arrow navigation
             if (reviewNavPrev) {
                 reviewNavPrev.addEventListener('click', () => {
                     const prevIndex = (currentReview - 1 + reviewCards.length) % reviewCards.length;
                     showReview(prevIndex);
                 });
             }

             if (reviewNavNext) {
                 reviewNavNext.addEventListener('click', () => {
                     const nextIndex = (currentReview + 1) % reviewCards.length;
                     showReview(nextIndex);
                 });
             }

             // Swipe functionality
             const reviewsContainer = document.querySelector('.reviews-container');
             if (reviewsContainer) {
                 let startX = 0;
                 let startY = 0;
                 let distX = 0;
                 let distY = 0;
                 let isDragging = false;
                 const threshold = 50; // Minimum distance to trigger swipe

                 // Mouse events
                 reviewsContainer.addEventListener('mousedown', (e) => {
                     startX = e.clientX;
                     startY = e.clientY;
                     isDragging = true;
                 });

                 reviewsContainer.addEventListener('mousemove', (e) => {
                     if (!isDragging) return;
                     e.preventDefault();
                 });

                 reviewsContainer.addEventListener('mouseup', (e) => {
                     if (!isDragging) return;
                     distX = e.clientX - startX;
                     distY = e.clientY - startY;
                     
                     // Check if horizontal swipe is dominant
                     if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                         if (distX > 0) {
                             // Swipe right - show previous
                             const prevIndex = (currentReview - 1 + reviewCards.length) % reviewCards.length;
                             showReview(prevIndex);
                         } else {
                             // Swipe left - show next
                             const nextIndex = (currentReview + 1) % reviewCards.length;
                             showReview(nextIndex);
                         }
                     }
                     
                     isDragging = false;
                 });

                 reviewsContainer.addEventListener('mouseleave', () => {
                     isDragging = false;
                 });

                 // Touch events
                 reviewsContainer.addEventListener('touchstart', (e) => {
                     startX = e.touches[0].clientX;
                     startY = e.touches[0].clientY;
                 }, { passive: true });

                 reviewsContainer.addEventListener('touchmove', (e) => {
                     // Allow scrolling but track the touch movement
                     distX = e.touches[0].clientX - startX;
                     distY = e.touches[0].clientY - startY;
                 }, { passive: true });

                 reviewsContainer.addEventListener('touchend', (e) => {
                     // Check if horizontal swipe is dominant
                     if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
                         if (distX > 0) {
                             // Swipe right - show previous
                             const prevIndex = (currentReview - 1 + reviewCards.length) % reviewCards.length;
                             showReview(prevIndex);
                         } else {
                             // Swipe left - show next
                             const nextIndex = (currentReview + 1) % reviewCards.length;
                             showReview(nextIndex);
                         }
                     }
                     
                     distX = 0;
                     distY = 0;
                 }, { passive: true });
             }
         }

         // Get In Touch Section (entrance animations removed; arrow click handler kept)
         const heroArrowIndicator = document.getElementById('heroArrowIndicator');
         if (heroArrowIndicator) {
             // Click handler to scroll to form
             heroArrowIndicator.addEventListener('click', () => {
                 const form = document.querySelector('.get-in-touch-right');
                 if (form) {
                     if (isMobile) {
                         form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     } else {
                         if (smoother) {
                             smoother.scrollTo('.get-in-touch-right', true, "top top");
                         } else {
                             gsap.to(window, {
                                 duration: 1,
                                 scrollTo: form,
                                 ease: 'power3.inOut'
                             });
                         }
                     }
                 }
             });
         }

         // Get In Touch Form Submission
         const getInTouchForm = document.getElementById('getInTouchForm');
         if (getInTouchForm) {
             getInTouchForm.addEventListener('submit', async (e) => {
                 e.preventDefault();
                 await submitGetInTouchForm(getInTouchForm);
             });
         }

         // Contact Form Animation - Declare variables first
        const contactOverlay = document.getElementById('contactOverlay');
        const contactFormPanel = document.getElementById('contactFormPanel');
        const contactCloseBtn = document.getElementById('contactCloseBtn');
        const getQuoteBtns = document.querySelectorAll('.getQuoteBtn');
        const contactForm = document.getElementById('contactForm');
        
        // Only initialize if elements exist
        if (contactOverlay && contactFormPanel && getQuoteBtns.length > 0) {
            const formGroups = document.querySelectorAll('.form-group');
            const formTitle = document.querySelector('.contact-form-title');
            const formSubtitle = document.querySelector('.contact-form-subtitle');

        // Create timeline for opening animation
        const openTimeline = gsap.timeline({ paused: true });

        // Set initial states for overlay and panel only
        gsap.set(contactOverlay, { opacity: 0 });
        gsap.set(contactFormPanel, { x: '100%' });

        // Open animation - faster and only animates the overlay and panel
        openTimeline
            .to(contactOverlay, {
                opacity: 1,
                duration: 0.2,
                ease: 'power2.out'
            })
            .to(contactFormPanel, {
                x: '0%',
                duration: 0.4,
                ease: 'power3.out'
            }, '-=0.1');

        // Close animation - faster and only animates the overlay and panel
        const closeTimeline = gsap.timeline({ paused: true });

        closeTimeline
            .to(contactFormPanel, {
                x: '100%',
                duration: 0.4,
                ease: 'power3.in'
            })
            .to(contactOverlay, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    contactOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, '-=0.1');

        // Open contact form
        function openContactForm() {
            contactOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            openTimeline.restart();
        }

        // Close contact form
        function closeContactForm() {
            closeTimeline.restart();
        }

        // Event listeners - attach to all buttons with getQuoteBtn class
        getQuoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openContactForm();
            });
        });

        if (contactCloseBtn) {
            contactCloseBtn.addEventListener('click', () => {
                closeContactForm();
            });
        }

        if (contactOverlay) {
            // Close on overlay click (outside panel)
            contactOverlay.addEventListener('click', (e) => {
                if (e.target === contactOverlay) {
                    closeContactForm();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactOverlay && contactOverlay.classList.contains('active')) {
                closeContactForm();
            }
        });

        // Form submission
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await submitContactForm(contactForm);
            });
        }
        } // End of contact form initialization check

        // FAQ Bento Box (entrance animations removed)

        // Marquee Animation
        class LogosMarquee {
            constructor({
                container = null,
                track = null,
                containerSelector = ".marquee__ctn",
                trackSelector = ".marquee__track",
                speed = 60 // pixels per second
            } = {}) {
                this.container = container || document.querySelector(containerSelector);
                this.track = track || document.querySelector(trackSelector);
                this.speed = speed;

                if (!this.container || !this.track) {
                    console.warn("Marquee: éléments introuvables.");
                    return;
                }

                this.trackWidth = this.track.getBoundingClientRect().width;
                this.pos = 0;
                this.start = null;
                this.rafId = null;

                this.setup();
                this.animate = this.animate.bind(this); // Bind pour requestAnimationFrame
                requestAnimationFrame(this.animate);
            }

            setup() {
                // Étendre la largeur du container
                this.container.style.width = `${this.trackWidth}px`;

                // Dupliquer le contenu pour boucler visuellement
                this.clone = this.track.cloneNode(true);
                this.container.appendChild(this.clone);

                // Optimisation mobile
                this.container.style.willChange = "transform";
            }

            animate(timestamp) {
                if (!this.start) this.start = timestamp;

                const elapsed = timestamp - this.start;
                this.pos = -(elapsed / 1000) * this.speed;

                if (Math.abs(this.pos) >= this.trackWidth) {
                    this.start = timestamp;
                    this.pos = 0;
                }

                this.container.style.transform = `translateX(${this.pos}px)`;

                this.rafId = requestAnimationFrame(this.animate);
            }

            destroy() {
                cancelAnimationFrame(this.rafId);
                if (this.clone) this.clone.remove();
                this.container.style.transform = "";
                this.container.style.willChange = "";
            }
        }

        // Initialize marquee when page loads
        window.addEventListener("load", () => {
            const serviceLink = document.querySelector('.service-link');
            serviceLink.addEventListener('click', (e) => {
                e.preventDefault();
            });
            const marqueeElement = document.querySelector('.marquee');
            if (marqueeElement) {
                const speed = marqueeElement.getAttribute('data-speed') || 60;
                const container = marqueeElement.querySelector('.marquee__ctn');
                const track = marqueeElement.querySelector('.marquee__track');
                
                if (container && track) {
                    const marquee = new LogosMarquee({
                        container: container,
                        track: track,
                        speed: parseInt(speed)
                    });
                }
            }
        });