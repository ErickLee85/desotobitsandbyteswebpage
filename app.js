const comingSoon = (route) => {

  switch (route) {
      case 'mobile development':
          window.location.href = './mobileDevelopment.html';
          break;
      case 'web app':
          window.location.href = './webAppDevelopment.html';
          break;
      case 'website':
          window.location.href = './websiteDevelopment.html';
          break;
      case 'desktop':
          window.location.href = './desktopDevelopment.html';
          break;
      case 'charts':
          window.location.href = './dataCharts.html';
          break;
      case 'chatbot':
          window.location.href = './chatBot.html';
          break;
      case 'imagegen':
          window.location.href = './imageGen.html';
          break;
      default:
          console.log('Unknown route:', route);
  }
}

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
var hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector('.mobile-nav')

function toggleMobileNav() {
  if (mobileNav.classList.contains('reveal-mobile-nav')) {
    mobileNav.classList.remove('reveal-mobile-nav');
    mobileNav.classList.add('hide-mobile-nav');
} else {
    mobileNav.classList.remove('hide-mobile-nav');
    mobileNav.classList.add('reveal-mobile-nav');
}
  hamburger.classList.toggle("is-active");
}
hamburger.addEventListener("click", toggleMobileNav);


const textArray = ["Websites | Web Applications ","Mobile Apps", "Custom Dashboards", "Data Charts", "AI Integration"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

type()



// const heroSection = document.querySelector('.hero');
// const images = [
//     './images/pexels-wdnet-887751.jpg',
//     './images/soft_dev.jpeg',
//     './images/team_dev_2.jpeg'
// ];

// let currentImageIndex = 0;

// function preloadImages(images) {
//     images.forEach((image) => {
//         const img = new Image();
//         img.src = image;
//     });
// }

// function createBackgroundContainer() {

//     const bgContainer = document.createElement('div');
//     bgContainer.className = 'hero-backgrounds';
//     bgContainer.style.position = 'absolute';
//     bgContainer.style.top = '0';
//     bgContainer.style.left = '0';
//     bgContainer.style.width = '100%';
//     bgContainer.style.height = '100%';
//     bgContainer.style.zIndex = '1'; 
//     return bgContainer;
// }

// function changeBackgroundImage() {
//     let bgContainer = heroSection.querySelector('.hero-backgrounds');
//     if (!bgContainer) {
//         bgContainer = createBackgroundContainer();
//         heroSection.insertBefore(bgContainer, heroSection.firstChild); 
//     }

//     const nextImageIndex = (currentImageIndex + 1) % images.length;
    
//     const nextImageDiv = document.createElement('div');
//     nextImageDiv.style.position = 'absolute';
//     nextImageDiv.style.top = '0';
//     nextImageDiv.style.left = '0';
//     nextImageDiv.style.width = '100%';
//     nextImageDiv.style.height = '100%';
//     nextImageDiv.style.opacity = '0';
//     nextImageDiv.style.transition = 'opacity 1s ease-in-out';
//     nextImageDiv.style.background = `linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.6)), url('${images[nextImageIndex]}')`;
//     nextImageDiv.style.backgroundPosition = 'center';
//     nextImageDiv.style.backgroundRepeat = 'no-repeat';
//     nextImageDiv.style.backgroundSize = 'cover';
    
//     bgContainer.appendChild(nextImageDiv);
    
//     nextImageDiv.offsetHeight;
    
//     nextImageDiv.style.opacity = '1';
    
//     setTimeout(() => {
//         const oldImages = bgContainer.getElementsByTagName('div');
//         while (oldImages.length > 1) {
//             bgContainer.removeChild(oldImages[0]);
//         }
//     }, 1000);
    
//     currentImageIndex = nextImageIndex;
// }

// heroSection.style.position = 'relative';
// heroSection.style.overflow = 'hidden';


// preloadImages(images);


// window.addEventListener('load', () => {
//     changeBackgroundImage(); 

//     setInterval(changeBackgroundImage, 6000);
// });


function toggleAccordion(element) {
    const body = element.nextElementSibling;
    body.classList.toggle('active');
}






const goTo = (section, nav) => {
  if(nav === 'mobile') {
    toggleMobileNav()
  } 
    switch (section) {
        case 'logo': 
        smoothScroll('logo')
        break;
        case 'pricing':
          smoothScroll('.pricing-container');
          break;
        case 'services':
            smoothScroll('.service-section');
            break;
        case 'testimonials':
            smoothScroll('.customer-reviews');
            break;
        case 'faqs':
            smoothScroll('.faq-section');
            break;
        case 'contact':
            smoothScroll('.contact-section');
            break;
        default:
            console.log('Section not recognized:', section);
            break;
    }
};


const serviceButton = document.getElementById('service-btn')
const sendMessage = document.querySelector('.send-message')
if(serviceButton) {
  serviceButton.addEventListener('click', () => {
    smoothScroll('.service-section')
 })
}

if(sendMessage) {
  sendMessage.addEventListener('click', () => {
    smoothScroll('.contact-section')
  })
}




let lastScrollTop = 0;

// window.addEventListener("scroll", function() {
//     const mobileNav = document.querySelector('.mobile-nav');
//     if(mobileNav.classList.contains('reveal-mobile-nav')) {
//         return;
//     }
//     let scrollTop = window.scrollY || document.documentElement.scrollTop;
//     let nav = document.querySelector('#nav-two');

//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         nav.classList.remove('fade-in');
//         nav.classList.add('fade-out');
//     } else {
//         // Scrolling up
//         nav.classList.remove('fade-out');
//         nav.classList.add('fade-in');
//     }

//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
// });


// window.addEventListener('resize', () => {
//     if(window.innerWidth > 1050) {
//         const mobileNav = document.querySelector('.mobile-nav');
//         if(mobileNav.classList.contains('reveal-mobile-nav')) {
//             mobileNav.classList.remove('reveal-mobile-nav')
//             mobileNav.classList.add('hide-mobile-nav')
//         }
//     }
// })

window.addEventListener('load', () => {
  document.querySelector('.loader-container').style.display = 'none';
})





function smoothScroll(section) {

  if(section === 'logo') {
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
    return;
  }

// const targetId = '.project-mgmt-section'
const targetId = section
const targetPosition = document.querySelector(targetId).offsetTop - 50;
const startPosition = window.scrollY;

const distance = targetPosition - startPosition;
const duration = 1500;
let start = null;

window.requestAnimationFrame(step);

function step(timestamp) {
  if (!start) start = timestamp;
  const progress = timestamp - start;
  // window.scrollTo(0, distance*(progress/duration) + startPosition);
  window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
  if (progress < duration) window.requestAnimationFrame(step);
}
}

// Easing Functions

function linear(t, b, c, d) {
return c*t/d + b;
};

function easeInOutQuad(t, b, c, d) {
t /= d/2;
if (t < 1) return c/2*t*t + b;
t--;
return -c/2 * (t*(t-2) - 1) + b;
};

function easeInOutCubic(t, b, c, d) {
t /= d/2;
if (t < 1) return c/2*t*t*t + b;
t -= 2;
return c/2*(t*t*t + 2) + b;
};



// const hamburgerMenu = document.querySelector('.hamburger-menu');



// hamburgerMenu.addEventListener('click', () => {
//     hamburgerMenu.classList.toggle('spin')
//     const mobileNav = document.querySelector('.mobile-nav');

//     if (mobileNav.classList.contains('reveal-mobile-nav')) {
//         mobileNav.classList.remove('reveal-mobile-nav');
//         mobileNav.classList.add('hide-mobile-nav');
//     } else {
//         mobileNav.classList.remove('hide-mobile-nav');
//         mobileNav.classList.add('reveal-mobile-nav');
//     }
// });


// window.addEventListener('load', () => {
//   document.querySelector('.loader-container').style.display = 'none'
// })


document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  document.querySelector('.form-loader-container').style.display = 'grid';

  // Retrieve form values
  const data = {
    services: document.getElementById('service-select').value,
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  // Simple validation function
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone); // Example: 10 digits for US format

  // Check for missing or invalid values
  if (!data.name) {
    Swal.fire({ text: "Please enter your full name", icon: "warning" });
    document.querySelector('.form-loader-container').style.display = 'none';
    return;
  }

  if (!isValidEmail(data.email)) {
    Swal.fire({ text: "Please enter a valid email address", icon: "warning" });
    document.querySelector('.form-loader-container').style.display = 'none';
    return;
  }

  // if (!isValidPhone(data.phone)) {
  //   Swal.fire({ text: "Please enter a valid phone number (10 digits)", icon: "warning" });
  //   document.querySelector('.form-loader-container').style.display = 'none';
  //   return;
  // }

  // Axios API
  // try {
  //   const response = await axios.post('https://nodemailer-gold.vercel.app/sendMessage', data);
  //   document.querySelector('.form-loader-container').style.display = 'none';
  //   Swal.fire({
  //     text: "Message Sent!",
  //     icon: "success"
  //   });
  // } catch (error) {
  //   document.querySelector('.form-loader-container').style.display = 'none';
  //   Swal.fire({
  //     text: "Message Failed",
  //     icon: "info"
  //   });
  //   console.error('There was an error!', error);
  // }

  try {
    const response = await fetch('https://nodemailer-gold.vercel.app/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    document.querySelector('.form-loader-container').style.display = 'none';
    
    if (response.ok) {
      openSnack()
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    document.querySelector('.form-loader-container').style.display = 'none';
    alert('Message Failed To Send')
    console.error('There was an error!', error);
  } 

  document.getElementById('contact-form').reset();
});


document.querySelectorAll('.c-faqs__item-question').forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.parentElement;

        // Close all open items except the one clicked
        document.querySelectorAll('.c-faqs__item').forEach((faqItem) => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });

        // Toggle the clicked item
        item.classList.toggle('active');
    });
});




// Generate service divs dynamically
const services = [
  {
    title: "Mobile App",
    description: `
      We craft powerful, user-friendly mobile applications that set new standards in performance and user experience. Our expert team delivers native-quality apps for both iOS and Android platforms, ensuring your business stays ahead in the mobile-first world.
      <ul>
        <li>Native & cross-platform development using React Native</li>
        <li>Seamless integration with existing systems and third-party APIs</li>
        <li>Advanced features including offline mode, push notifications, and real-time updates</li>
        <li>Rigorous testing across multiple devices and OS versions</li>
        <li>App Store optimization and submission support</li>
        <li>Performance monitoring and analytics integration</li>
      </ul>
    `,
    icon: "fa-light fa-mobile",
  },
  {
    title: "Web App",
    description: `
      Transform your business with our cutting-edge web applications built for the modern digital landscape. We combine innovative technology with exceptional user experience to create scalable, secure, and high-performance solutions that drive real business results.
      <ul>
        <li>Modern frontend frameworks (React, Vue.js, Angular) for optimal performance</li>
        <li>Robust backend architecture with Node.js, Python, or Java</li>
        <li>Advanced security features including SSL, 2FA, and data encryption</li>
        <li>Real-time analytics and reporting dashboards</li>
        <li>Cloud deployment with AWS, Google Cloud, or Azure</li>
        <li>Progressive Web App capabilities for enhanced user engagement</li>
      </ul>
    `,
    icon: "fa-light fa-globe-pointer",
  },
  {
    title: "Company Website",
    description: `
      Create a powerful online presence with our custom-designed, conversion-focused websites. We blend stunning design with technical excellence to build websites that not only look impressive but also drive business growth and user engagement.
      <ul>
        <li>Custom-designed UI/UX optimized for your target audience</li>
        <li>Advanced SEO implementation with schema markup and optimization</li>
        <li>Lightning-fast page loads with modern optimization techniques</li>
        <li>Content Management System with intuitive admin controls</li>
        <li>Integration with marketing tools and analytics platforms</li>
        <li>Regular security updates and performance monitoring</li>
      </ul>
    `,
    icon: "fa-light fa-browser",
  },
  {
    title: "Desktop App",
    description: `
      Elevate your business operations with powerful desktop applications designed for performance and efficiency. Our cross-platform solutions deliver enterprise-grade functionality with intuitive interfaces, perfect for complex business operations and data-intensive tasks.
      <ul>
        <li>Cross-platform development using Electron or .NET</li>
        <li>Powerful offline capabilities with local data synchronization</li>
        <li>Advanced security features for sensitive business data</li>
        <li>Custom automation tools for improved productivity</li>
        <li>Integration with existing enterprise systems</li>
        <li>Regular updates and maintenance support</li>
      </ul>
    `,
    icon: "fa-thin fa-desktop",
  },
  {
    title: "Data Charts",
    description: `
      Transform complex data into actionable insights with our advanced data visualization solutions. We create interactive, real-time charts and graphs that make data interpretation intuitive and decision-making easier for your team and stakeholders.
      <ul>
        <li>Interactive visualizations using D3.js, Chart.js, or Highcharts</li>
        <li>Real-time data updates and historical trend analysis</li>
        <li>Custom filters and drill-down capabilities</li>
        <li>Export functionality for reports and presentations</li>
        <li>Integration with multiple data sources and APIs</li>
        <li>Mobile-responsive design for on-the-go access</li>
      </ul>
    `,
    icon: "fa-thin fa-chart-line",
  },
  {
    title: "AI ChatBot",
    description: `
      Revolutionize your customer service with our AI-powered chatbots. Using cutting-edge natural language processing and machine learning, our chatbots provide intelligent, context-aware responses while continuously learning from interactions to improve service quality.
      <ul>
        <li>Advanced NLP for human-like conversations and intent recognition</li>
        <li>Multi-language support with automatic translation</li>
        <li>Smart routing between automated and human support</li>
        <li>Custom training with your business knowledge base</li>
        <li>Analytics dashboard for performance monitoring</li>
        <li>Integration with popular messaging platforms and CRM systems</li>
      </ul>
    `,
    icon: "fa-thin fa-comments",
  },
  {
    title: "AI Image Generator",
    description: `
      Harness the power of artificial intelligence to create stunning, unique visuals for your projects. Our AI image generation platform combines cutting-edge machine learning models with intuitive controls to produce high-quality, customizable images for any creative need.
      <ul>
        <li>State-of-the-art AI models for high-quality image generation</li>
        <li>Custom style transfer and image manipulation options</li>
        <li>Batch processing for multiple images</li>
        <li>Advanced editing tools and filters</li>
        <li>Commercial usage rights for generated content</li>
        <li>Integration with popular design software</li>
      </ul>
    `,
    icon: "fa-thin fa-image",
  },
  {
    title: "Custom Dashboards",
    description: `
      Empower your decision-making with our sophisticated, customizable dashboard solutions. We create intuitive, data-rich interfaces that bring together key metrics, analytics, and controls in one seamless platform, tailored specifically to your business needs.
      <ul>
        <li>Fully customizable layouts with drag-and-drop functionality</li>
        <li>Real-time data visualization and monitoring</li>
        <li>Interactive reports with advanced filtering options</li>
        <li>Role-based access control and user permissions</li>
        <li>Integration with multiple data sources and APIs</li>
        <li>Automated reporting and alert systems</li>
      </ul>
    `,
    icon: "fa-thin fa-table-columns",
  }
];
// Generate service divs dynamically
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', function() {
    const serviceIndex = this.getAttribute('data-service');
    openModal(serviceIndex);
  });
});

document.querySelectorAll('.footer-development ul li').forEach(item => {
  item.addEventListener('click', () => {
    const serviceIndex = item.getAttribute('data-service');
    openModal(serviceIndex);
  });
});

document.querySelectorAll('.visualize ul li').forEach(item => {
  item.addEventListener('click', () => {
    const serviceIndex = item.getAttribute('data-service');
    openModal(serviceIndex);
  });
});

document.querySelectorAll('.footer-ai ul li').forEach(item => {
  item.addEventListener('click', () => {
    const serviceIndex = item.getAttribute('data-service');
    openModal(serviceIndex);
  });
});

let newClass;

function openModal(serviceIndex) {
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const faIcon = document.getElementById('font-awesome-icon')

  
  modalTitle.textContent = services[serviceIndex].title;
  modalDescription.innerHTML = services[serviceIndex].description;
  const faClass = services[serviceIndex].icon
  const parts = faClass.split(' ');  
  const part2 = parts[1];  

  if(newClass) {
    faIcon.classList.remove(newClass)
  }
  faIcon.classList.add(part2)

  newClass = part2
  
  
  document.getElementById('service-modal').style.display = 'flex';
  const modalContent =  document.querySelector('.modal-content')
  if(modalContent.classList.contains('scale-down')) {
    modalContent.classList.remove('scale-down') 
    modalContent.classList.add('scale-up')
  } 
}

const modal = document.getElementById('service-modal');

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
  const modalContent =  document.querySelector('.modal-content')
  modalContent.classList.remove('scale-up')
  modalContent.classList.add('scale-down')
 
 setTimeout(() => {
  document.getElementById('service-modal').style.display = 'none';
 },300)
}

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Function to switch theme
function switchTheme(e) {
  const nightLogos = document.querySelectorAll('.night-logo');
  const dayLogos = document.querySelectorAll('.day-logo');

  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    nightLogos.forEach(logo => logo.style.display = 'block');
    dayLogos.forEach(logo => logo.style.display = 'none');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    nightLogos.forEach(logo => logo.style.display = 'none');
    dayLogos.forEach(logo => logo.style.display = 'block');
  }
}

// Check theme preference from local storage, or fall back to system preference
function checkStoredOrSystemTheme() {
  const nightLogos = document.querySelectorAll('.night-logo');
  const dayLogos = document.querySelectorAll('.day-logo');
  let currentTheme = localStorage.getItem('theme');

  if (!currentTheme) {
    // Check for system preference if no theme is stored
    currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    nightLogos.forEach(logo => logo.style.display = 'block');
    dayLogos.forEach(logo => logo.style.display = 'none');
  } else {
    toggleSwitch.checked = false;
    document.documentElement.setAttribute('data-theme', 'light');
    nightLogos.forEach(logo => logo.style.display = 'none');
    dayLogos.forEach(logo => logo.style.display = 'block');
  }
}

// Save theme preference in localStorage
toggleSwitch.addEventListener('change', function (e) {
  switchTheme(e);
  localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
}, false);

checkStoredOrSystemTheme();


// const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// // Function to switch theme
// function switchTheme(e) {
//   const nightLogos = document.querySelectorAll('.night-logo');
//   const dayLogos = document.querySelectorAll('.day-logo');

//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     nightLogos.forEach(logo => logo.style.display = 'block');
//     dayLogos.forEach(logo => logo.style.display = 'none');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     nightLogos.forEach(logo => logo.style.display = 'none');
//     dayLogos.forEach(logo => logo.style.display = 'block');
//   }
// }

// // Check if the user has a stored theme preference
// function checkStoredTheme() {
//   const nightLogos = document.querySelectorAll('.night-logo');
//   const dayLogos = document.querySelectorAll('.day-logo');
//   const currentTheme = localStorage.getItem('theme') || 'dark'; // default to light theme

//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//     document.documentElement.setAttribute('data-theme', 'dark');
//     nightLogos.forEach(logo => logo.style.display = 'block');
//     dayLogos.forEach(logo => logo.style.display = 'none');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     nightLogos.forEach(logo => logo.style.display = 'none');
//     dayLogos.forEach(logo => logo.style.display = 'block');
//   }
// }

// // Save theme preference in localStorage
// toggleSwitch.addEventListener('change', function (e) {
//   switchTheme(e);
//   localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
// }, false);

// checkStoredTheme();

let currentSlide = 0;
const slides = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.dot');
let slideInterval = setInterval(nextSlide, 10000);

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000);
}

// Event listeners
document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.prev').addEventListener('click', () => {
    previousSlide();
    resetInterval();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
    });
});


const closeBtn = document.querySelector('.close-snack')
const snack = document.querySelector('.snack')

if(closeBtn) {
  closeBtn.addEventListener('click', () => {
    snack.classList.add('hide')
})
}

function openSnack() {
 snack.classList.add('open')
}

