 gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother, DrawSVGPlugin);

        // Form submission handlers
        async function submitContactForm(contactForm) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.innerHTML = 'Sending...';
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
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
                // Get form data
                const formData = new FormData(getInTouchForm);
                const data = Object.fromEntries(formData);
                
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
                        smoother:3
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
                                smoother.scrollTo(".stats-section", true, "center center");
                            } else {
                                // Fallback for mobile
                                statsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }
                    });
                }
               document.fonts.ready.then(() => {
                        // Hero tagline animation
                        const heroTagline = document.querySelector(".hero-tagline");
                        if (heroTagline) {
                            let split = SplitText.create([".hero-tagline"], { type: "words" });
                            gsap.fromTo(split.words, {opacity: 0,filter:'blur(10px)',},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,});
                        }
                        
                        // Hero subtitle animation
                        const heroSubtitle = document.querySelector(".hero-subtitle");
                        if (heroSubtitle) {
                            let split2 = SplitText.create(".hero-subtitle", {type:"words"});
                            gsap.fromTo(split2.words,{opacity:0,},{opacity:1,duration:1,stagger:0.1});
                        }
                        
                        // Hero subtext animation
                        const heroSubtext = document.querySelector(".hero-subtext");
                        if (heroSubtext) {
                            let split3 = SplitText.create(".hero-subtext",{type:"words"});
                            gsap.fromTo(split3.words,{opacity:0},{opacity:1,duration:0.5,stagger:0.1,delay:1.2});
                        }
                        
                        // Trusted logo animation
                        const trustedLogo = document.querySelector(".trusted-logo");
                        if (trustedLogo) {
                            let split4 = SplitText.create(".trusted-logo", {type:"words"});
                            gsap.from(split4.words,{opacity:0, stagger:0.1,
                                scrollTrigger: {
                                trigger: split4.words[0].parentElement,
                                start: "top 85%",
                                toggleActions: "play none none none",
                            }
                            });
                        }
                        
                        // Hero CTA animation
                        const heroCta = document.querySelector(".hero-cta > a");
                        if (heroCta) {
                            gsap.fromTo(".hero-cta > a",{y:20,opacity:0},{y:0,opacity:1,duration:1,delay:1.5});
                        }
                        
                        // Stats section animations
                        const statsSection = document.querySelector(".stats-section");
                        if (statsSection) {
                            const statsImage = document.querySelector(".stats-image");
                            if (statsImage) {
                                gsap.fromTo(".stats-image",{opacity:0},{
                                    opacity:1,duration:1.5,scrollTrigger: {
                                            trigger: ".stats-section",
                                            start: "top 50%",
                                            toggleActions: "play none none none",
                                        }});
                            }
                            
                            // Stats animation with ScrollTrigger
                            const statItems = document.querySelectorAll(".stat-item");
                            if (statItems.length > 0) {
                                gsap.fromTo(".stat-item",
                                    {
                                        x: -50,
                                        opacity: 0,
                                        filter: 'blur(10px)'
                                    },
                                    {
                                        x: 0,
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                        stagger: 0.2,
                                        duration: 0.8,
                                        ease: 'power3.out',
                                        scrollTrigger: {
                                            trigger: ".stats-section",
                                            start: "top 50%",
                                            toggleActions: "play none none none",
                                        }
                                    }
                                );
                            }

                            // Stat number counter animation
                            const statNumbers = document.querySelectorAll('.stat-number');
                            if (statNumbers.length > 0) {
                                statNumbers.forEach((statNumber) => {
                                    const text = statNumber.textContent.trim();
                                    // Extract number by removing all non-digits
                                    const number = parseInt(text.replace(/\D/g, ''));
                                    // Extract suffix - get everything after the last digit (including commas, +, etc.)
                                    const suffix = text.replace(/[\d,]/g, '');
                                    
                                    // Function to format number with commas
                                    const formatNumber = (num) => {
                                        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    };
                                    
                                    gsap.fromTo(statNumber, 
                                        { textContent: 0 },
                                        {
                                            textContent: number,
                                            duration: 2,
                                            ease: 'power1.out',
                                            snap: { textContent: 1 },
                                            scrollTrigger: {
                                                trigger: ".stats-section",
                                                start: "top 50%",
                                                toggleActions: "play none none none",
                                            },
                                            onUpdate: function() {
                                                const currentValue = Math.ceil(statNumber.textContent);
                                                statNumber.textContent = formatNumber(currentValue) + suffix;
                                            }
                                        }
                                    );
                                });
                            }
                            
                            // Stats content heading animation
                            const statsContentH2 = document.querySelector(".stats-content h2");
                            if (statsContentH2) {
                                let split5 = SplitText.create(".stats-content h2", {type:"words"});
                                gsap.fromTo(split5.words,{opacity:0,filter:'blur(5px)'},{opacity:1,filter:'blur(0px)',duration: 1,stagger: 0.1,delay:0.5,
                                    scrollTrigger: {
                                            trigger: ".stats-section",
                                            start: "top 50%",
                                            toggleActions: "play none none none",
                                    }
                                });
                            }
                            
                            // Stats content paragraph animation
                            const statsContentP = document.querySelector(".stats-content p");
                            if (statsContentP) {
                                let split6 = SplitText.create(".stats-content p",{type:"words"});
                                gsap.fromTo(split6.words,{opacity:0},{opacity:1,duration:0.5,stagger:0.1,delay:1.2,
                                     scrollTrigger: {
                                             trigger: ".stats-section",
                                             start: "top 50%",
                                             toggleActions: "play none none none",
                                     }
                                 });
                            }
                        }

                     // Mobile Hero Section Animations
                     const mobileHeroSubtitle = document.querySelector('.mobile-hero-subtitle');
                     const mobileHeroTitle = document.querySelector('.mobile-hero-title');
                     const mobileHeroSubtext = document.querySelector('.mobile-hero-subtext');
                     const mobileHeroCta = document.querySelector('.mobile-hero-cta');
                     
                     if (mobileHeroSubtitle) {
                         let splitMobileSubtitle = SplitText.create([".mobile-hero-subtitle"], { type: "words" });
                         gsap.fromTo(splitMobileSubtitle.words, {
                             opacity: 0
                         }, {
                             opacity: 1,
                             duration: 1,
                             stagger: 0.1,
                             delay: 0.3
                         });
                     }
                     
                     if (mobileHeroTitle) {
                         let splitMobileTitle = SplitText.create([".mobile-hero-title"], { type: "words" });
                         gsap.fromTo(splitMobileTitle.words, {
                             opacity: 0,
                             filter: 'blur(10px)'
                         }, {
                             opacity: 1,
                             filter: 'blur(0px)',
                             duration: 1,
                             stagger: 0.1,
                             delay: 0.5
                         });
                     }
                     
                     if (mobileHeroSubtext) {
                         let splitMobileSubtext = SplitText.create([".mobile-hero-subtext"], { type: "words" });
                         gsap.fromTo(splitMobileSubtext.words, {
                             opacity: 0
                         }, {
                             opacity: 1,
                             duration: 0.5,
                             stagger: 0.1,
                             delay: 1.2
                         });
                     }
                     
                     if (mobileHeroCta) {
                         gsap.fromTo(".mobile-hero-cta button", {
                             y: 20,
                             opacity: 0
                         }, {
                             y: 0,
                             opacity: 1,
                             duration: 1,
                             stagger: 0.1,
                             delay: 1.5
                         });
                     }

                     // Animate Mobile App Features Section
                     document.fonts.ready.then(() => {
                         const mobileAppFeaturesSection = document.querySelector('.mobile-app-features-section');
                         if (mobileAppFeaturesSection) {
                             const mobileAppFeaturesContent = document.querySelector('.mobile-app-features-content');
                             const mobileAppFeaturesHeading = mobileAppFeaturesContent?.querySelector('h2');
                             const mobileAppFeaturesParagraph = mobileAppFeaturesContent?.querySelector('p');
                             const mobileAppFeatureItems = document.querySelectorAll('.mobile-app-feature-item');

                             // Animate heading with SplitText
                             if (mobileAppFeaturesHeading) {
                                 let splitMobileFeaturesHeading = SplitText.create(".mobile-app-features-content h2", {type:"words"});
                                 gsap.fromTo(splitMobileFeaturesHeading.words, {
                                     opacity: 0,
                                     filter: 'blur(5px)'
                                 }, {
                                     opacity: 1,
                                     filter: 'blur(0px)',
                                     duration: 1,
                                     stagger: 0.1,
                                     delay: 0.5,
                                     scrollTrigger: {
                                         trigger: mobileAppFeaturesSection,
                                         start: "top 80%",
                                         toggleActions: "play none none none"
                                     }
                                 });
                             }

                             // Animate paragraph with SplitText
                             if (mobileAppFeaturesParagraph) {
                                 let splitMobileFeaturesParagraph = SplitText.create(".mobile-app-features-content p", {type:"words"});
                                 gsap.fromTo(splitMobileFeaturesParagraph.words, {
                                     opacity: 0
                                 }, {
                                     opacity: 1,
                                     duration: 0.5,
                                     stagger: 0.1,
                                     delay: 1.2,
                                     scrollTrigger: {
                                         trigger: mobileAppFeaturesSection,
                                         start: "top 80%",
                                         toggleActions: "play none none none"
                                     }
                                 });
                             }

                             // Animate feature items
                             if (mobileAppFeatureItems.length > 0) {
                                 // Set initial state
                                 gsap.set(mobileAppFeatureItems, {
                                     x: -50,
                                     opacity: 0
                                 });

                                 // Animate on scroll
                                 gsap.to(mobileAppFeatureItems, {
                                     x: 0,
                                     opacity: 1,
                                     duration: 0.8,
                                     stagger: 0.1,
                                     delay: 1.5,
                                     ease: 'power3.out',
                                     scrollTrigger: {
                                         trigger: mobileAppFeaturesSection,
                                         start: "top 80%",
                                         toggleActions: "play none none none"
                                     }
                                 });
                             }

                             // Animate image
                             const mobileAppFeaturesImage = document.querySelector(".mobile-app-features-image");
                             if (mobileAppFeaturesImage) {
                                 gsap.fromTo(".mobile-app-features-image", {
                                     opacity: 0
                                 }, {
                                     opacity: 1,
                                     duration: 1.5,
                                     scrollTrigger: {
                                         trigger: mobileAppFeaturesSection,
                                         start: "top 80%",
                                         toggleActions: "play none none none"
                                     }
                                 });
                             }
                         }
                     });

                     // Animate WebGL section title and subtitle
                     const webglTitle = document.querySelector('.webgl-title');
                     const webglSubtitle = document.querySelector('.webgl-subtitle');
                     const webglCanvas = document.querySelector('.webgl-content');
                     
                     if (webglTitle && webglSubtitle) {
                         let splitWebglTitle = SplitText.create([".webgl-title"], { type: "words" });
                         let splitWebglSubtitle = SplitText.create([".webgl-subtitle"], { type: "words" });
                         
                         gsap.fromTo(splitWebglTitle.words, {
                             opacity: 0,
                             filter: 'blur(10px)'
                         }, {
                             opacity: 1,
                             filter: 'blur(0px)',
                             duration: 1,
                             stagger: 0.1,
                             delay: 0.5,
                             scrollTrigger: {
                                 trigger: ".webgl-section",
                                 start: "top 80%",
                                 toggleActions: "play none none none"
                             }
                         });
                         
                         gsap.fromTo(splitWebglSubtitle.words, {
                             opacity: 0
                         }, {
                             opacity: 1,
                             duration: 1,
                             stagger: 0.1,
                             delay: 1.2,
                             scrollTrigger: {
                                 trigger: ".webgl-section",
                                 start: "top 80%",
                                 toggleActions: "play none none none"
                             }
                         });
                     }
                     
                     // Animate reviews heading on scroll
                     const reviewsHeading = document.querySelector('.reviews-heading');
                     if (reviewsHeading) {
                         let splitReviewsHeading = SplitText.create([".reviews-heading"], { type: "words" });
                         gsap.fromTo(splitReviewsHeading.words, {
                             opacity: 0,
                             filter: 'blur(10px)'
                         }, {
                             opacity: 1,
                             filter: 'blur(0px)',
                             duration: 1,
                             stagger: 0.1,
                             delay: 0.5,
                             scrollTrigger: {
                                 trigger: reviewsHeading,
                                 start: "top 80%",
                                 toggleActions: "play none none none"
                             }
                         });
                     }

                     // Services Section Pin Animation
                    const servicesSection = document.querySelector('.services-section');
                    const serviceItems = document.querySelectorAll('.service-item');
                    const servicesHeading = document.querySelector('.services-heading');
                    
                    if (servicesSection && serviceItems.length > 0) {
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

                        // Only pin on desktop devices
                        if (!isMobile) {
                            ScrollTrigger.create({
                                trigger: servicesSection,
                                start: "top top",
                                end: "+=4000",
                                pin: ".services-container",
                                anticipatePin: 1,
                                scrub: 1
                            });
                        }

                        // Animate each service item as it comes into view
                        serviceItems.forEach((item, index) => {
                            const title = item.querySelector('.service-title');
                            const description = item.querySelector('.service-description');
                            const number = item.querySelector('.service-number');
                            const featureItems = item.querySelectorAll('.service-feature-item');
                            
                            // On mobile, use simpler animations without scrub
                            if (isMobile) {
                                // Set initial states
                                gsap.set([title, description], { 
                                    opacity: 0, 
                                    y: 30,
                                    filter: 'blur(10px)'
                                });
                                gsap.set(number, { 
                                    opacity: 0, 
                                    y: 30,
                                    filter: 'blur(10px)',
                                    scale: 0.8 
                                });
                                gsap.set(featureItems, {
                                    opacity: 0,
                                    x: -30,
                                    filter: 'blur(5px)'
                                });

                                // Simple scroll-triggered animation for mobile
                                const mobileTimeline = gsap.timeline({
                                    scrollTrigger: {
                                        trigger: item,
                                        start: "top 80%",
                                        toggleActions: "play none none none"
                                    }
                                });

                                mobileTimeline
                                    .to([number, title, description], {
                                        opacity: 1,
                                        y: 0,
                                        filter: 'blur(0px)',
                                        scale: 1,
                                        duration: 1.2,
                                        stagger: 0.2,
                                        ease: 'power3.out'
                                    })
                                    .to(featureItems, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 0.6,
                                        stagger: 0.1,
                                        ease: 'power2.out'
                                    }, '-=0.3');
                            } else {
                                // Desktop animation with scrub
                                // Alternate between left and right animation
                                const isEven = index % 2 === 0;
                                const xOffset = isEven ? -200 : 200;
                                
                                // Set initial states - animate from x-axis
                                gsap.set([title, description], { 
                                    opacity: 0, 
                                    x: xOffset,
                                    filter: 'blur(10px)'
                                });
                                gsap.set(number, { 
                                    opacity: 0, 
                                    x: xOffset,
                                    scale: 0.8 
                                });
                                gsap.set(featureItems, {
                                    opacity: 0,
                                    x: xOffset + 50,
                                    filter: 'blur(5px)'
                                });
                                gsap.set(item, {
                                    x: 0
                                });

                                // Create timeline for each service
                                const serviceTimeline = gsap.timeline({
                                    scrollTrigger: {
                                        trigger: servicesSection,
                                        start: `top+=${index * 800} top`,
                                        end: `top+=${(index + 1) * 800} top`,
                                        scrub: 1,
                                        onEnter: () => {
                                            // Remove active class from all items
                                            serviceItems.forEach(si => si.classList.remove('active'));
                                            // Add active class to current item
                                            item.classList.add('active');
                                        },
                                        onEnterBack: () => {
                                            serviceItems.forEach(si => si.classList.remove('active'));
                                            item.classList.add('active');
                                        },
                                        onLeave: () => {
                                            if (index < serviceItems.length - 1) {
                                                item.classList.remove('active');
                                            }
                                        },
                                        onLeaveBack: () => {
                                            if (index > 0) {
                                                item.classList.remove('active');
                                            }
                                        }
                                    }
                                });

                                // Animate from x-axis - number first, then title, then description, then features
                                serviceTimeline
                                    .to(number, {
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        duration: 0.8,
                                        ease: 'power3.out'
                                    })
                                    .to(title, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 1,
                                        ease: 'power3.out'
                                    }, '-=0.4')
                                    .to(description, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 1,
                                        ease: 'power3.out'
                                    }, '-=0.6')
                                    .to(featureItems, {
                                        opacity: 1,
                                        x: 0,
                                        filter: 'blur(0px)',
                                        duration: 0.8,
                                        stagger: 0.1,
                                        ease: 'power2.out'
                                    }, '-=0.4');
                            }
                        });

                        // Set first service as active initially (only on desktop)
                        if (!isMobile) {
                            serviceItems[0]?.classList.add('active');
                        }
                    }
               })

             // Number counter animation
           
            
            

        });

        // Custom smooth scroll function using requestAnimationFrame
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

        let lastScrollY = 0;
        const navbar = document.querySelector('header'); // or whatever your navbar selector is

        if (navbar) {
        ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
            const currentScrollY = self.scroll();
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            const fiftyPercentScroll = 500;
            
            if (currentScrollY > lastScrollY && currentScrollY > fiftyPercentScroll) {
            // Scrolling down & past 50% of page
            gsap.to(navbar, {
                y: -100, // adjust based on your navbar height
                duration: 0.3,
            });
            } else if (currentScrollY < lastScrollY) {
            // Scrolling up
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

        // // Hero Image Slider
        // const slides = document.querySelectorAll('.hero-slide');
        // let currentSlide = 0;
        // let isAnimating = false;
        // let slideClicked = false;

        // // Set initial clip-path for all slides (hidden on the right)
        // gsap.set(slides, { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' });
        // // Show first slide
        // gsap.set(slides[0], { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });

        // function goToSlide(index, direction) {
        //     if (isAnimating || index === currentSlide) return;
        //     isAnimating = true;

        //     const oldSlide = slides[currentSlide];
        //     const newSlide = slides[index];

        //     // Create a timeline for synchronized animation
        //     const tl = gsap.timeline({
        //         onComplete: () => {
        //             oldSlide.classList.remove('active');
        //             newSlide.classList.add('active');
        //             isAnimating = false;
        //         }
        //     });

        //     // Animate old slide out (wipe left)
        //     tl.to(oldSlide, {
        //         clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        //         duration: 0.8,
        //         ease: 'power2.inOut'
        //     })
        //     // Animate new slide in (reveal from right)
        //     .fromTo(newSlide, 
        //         { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        //         { 
        //             clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        //             duration: 0.8,
        //             ease: 'power2.inOut'
        //         },
        //         '<' // Start at the same time as the previous animation
        //     );

        //     currentSlide = index;
        // }

        //  // Auto-play (optional - every 5 seconds)
        //  setInterval(() => {
        //      if(slideClicked) {
        //          slideClicked = false
        //          return;
        //      }
        //      const nextIndex = (currentSlide + 1) % slides.length;
        //      goToSlide(nextIndex, 'right');
        //  }, 10000);

         // Reviews Section Animation
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

         // Get In Touch Section Animation
         document.fonts.ready.then(() => {
             const getInTouchHero = document.querySelector('.get-in-touch-hero');
             if (getInTouchHero) {
                 let splitTouchHero = SplitText.create([".get-in-touch-hero"], { type: "words" });
                 gsap.fromTo(splitTouchHero.words, {
                     opacity: 0,
                     filter: 'blur(10px)'
                 }, {
                     opacity: 1,
                     filter: 'blur(0px)',
                     duration: 1,
                     stagger: 0.1,
                     delay: 0.5,
                     scrollTrigger: {
                         trigger: getInTouchHero,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             }

             // Animate arrow indicator
             const heroArrowIndicator = document.getElementById('heroArrowIndicator');
             if (heroArrowIndicator) {
                 gsap.fromTo(heroArrowIndicator, {
                     opacity: 0,
                     scale: 0
                 }, {
                     opacity: 1,
                     scale: 1,
                     duration: 0.6,
                     delay: 1.2,
                     ease: 'back.out(1.7)',
                     scrollTrigger: {
                         trigger: getInTouchHero,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });

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

             // Animate left content
             const getInTouchLeft = document.querySelector('.get-in-touch-left');
             if (getInTouchLeft) {
                 gsap.fromTo(getInTouchLeft, {
                     opacity: 0,
                     x: -50
                 }, {
                     opacity: 1,
                     x: 0,
                     duration: 0.8,
                     scrollTrigger: {
                         trigger: getInTouchLeft,
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             }

             // Animate form fields
             const formFields = document.querySelectorAll('.get-in-touch-form .form-field-group');
             formFields.forEach((field, index) => {
                 gsap.fromTo(field, {
                     opacity: 0,
                     y: 30
                 }, {
                     opacity: 1,
                     y: 0,
                     duration: 0.6,
                     delay: 0.2 + (index * 0.1),
                     scrollTrigger: {
                         trigger: '.get-in-touch-right',
                         start: "top 80%",
                         toggleActions: "play none none none"
                     }
                 });
             });
         });

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

        // FAQ Bento Box Animation
        document.fonts.ready.then(() => {

            // Animate FAQ bento cards on scroll
            const faqImg = document.querySelector('.faq-header-background');
            if (faqImg) {
            gsap.fromTo(faqImg, {
                clipPath: 'circle(10% at 50% 50%)'
            }, {
                clipPath: 'circle(100% at 50% 50%)',
                scrollTrigger: {
                    trigger: '.faq-header-background',
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            }
            const faqBentoCards = document.querySelectorAll('.faq-bento-card');
            if (faqBentoCards.length > 0) {
            faqBentoCards.forEach((card, index) => {
                gsap.fromTo(card, {
                    opacity: 0,
                }, {
                    opacity: 1,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
            }

            // Animate FAQ subtitle
         
        });

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