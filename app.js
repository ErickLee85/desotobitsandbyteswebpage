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

function goToRoute(route) {
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
        case 'contact':
            window.location.href = './contact.html';
        default:
            console.log('Unknown route:', route);
    }
}


function toggleAccordion(element) {
    const body = element.nextElementSibling;
    body.classList.toggle('active');
}



// const servicesObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//             document.getElementById('li-faqs').style.color = 'black'
//              document.getElementById('li-faqs').style.fontWeight = '400'
//             document.getElementById('li-testimonials').style.fontWeight = '400'
//             document.getElementById('li-testimonials').style.color = 'black';
//              document.getElementById('contact-section').style.color = 'black'
//              document.getElementById('contact-section').style.fontWeight = '400'
//                 document.getElementById('li-services').style.fontWeight = '600'
//                 document.getElementById('li-services').style.color = 'rgb(0, 119, 255)'
    
//       } else {
//         document.getElementById('li-services').style.fontWeight = '400'
//           document.getElementById('li-services').style.color = 'black';
//       }
//     });
//   }, {
//     threshold: 0.5,
//   });
  
//   const serviceSection = document.querySelector('.service-container');

// if(serviceSection) {
//     servicesObserver.observe(serviceSection);
// }



// const testimonialObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//             document.getElementById('li-faqs').style.color = 'black'
//              document.getElementById('li-faqs').style.fontWeight = '400'
//             document.getElementById('li-services').style.fontWeight = '400'
//             document.getElementById('li-services').style.color = 'black';
//              document.getElementById('contact-section').style.color = 'black'
//              document.getElementById('contact-section').style.fontWeight = '400'
//             document.getElementById('li-testimonials').style.fontWeight = '600'
//             document.getElementById('li-testimonials').style.color = 'rgb(0, 119, 255)'
    
//       } else {
//         document.getElementById('li-testimonials').style.fontWeight = '400'
//           document.getElementById('li-testimonials').style.color = 'black';
//       }
//     });
//   }, {
//     threshold: 0.5,
//   });
  
//   const testimonials = document.querySelector('.customer-reviews');

// if(testimonials) {
//     testimonialObserver.observe(testimonials);
// }



// const faqObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         document.getElementById('li-services').style.fontWeight = '400'
//         document.getElementById('li-services').style.color = 'black';
//       document.getElementById('li-testimonials').style.fontWeight = '400'
//        document.getElementById('li-testimonials').style.color = 'black'
//             document.getElementById('contact-section').style.color = 'black'
//              document.getElementById('contact-section').style.fontWeight = '400'
//           document.getElementById('li-faqs').style.color = 'rgb(0, 119, 255)'
//              document.getElementById('li-faqs').style.fontWeight = '600'
    
//       } else {
//        document.getElementById('li-faqs').style.color = 'black'
//         document.getElementById('li-faqs').style.fontWeight = '400'
//       }
//     });
//   }, {
//     threshold: 0.5,
//   });
  
//   const faqs = document.querySelector('.faq-section');

// if(faqs) {
//     faqObserver.observe(faqs);
// }




// const contactObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         document.getElementById('li-services').style.fontWeight = '400'
//         document.getElementById('li-services').style.color = 'black';
//       document.getElementById('li-testimonials').style.fontWeight = '400'
//        document.getElementById('li-testimonials').style.color = 'black'
//         document.getElementById('li-faqs').style.color = 'black'
//         document.getElementById('li-faqs').style.fontWeight = '400'
//           document.getElementById('contact-section').style.color = 'rgb(0, 119, 255)'
//              document.getElementById('contact-section').style.fontWeight = '600'
    
//       } else {
//       document.getElementById('contact-section').style.color = 'black'
//              document.getElementById('contact-section').style.fontWeight = '400'
//       }
//     });
//   }, {
//     threshold: 0.5,
//   });
  
//   const contactSection = document.querySelector('.contact-section');

// if(contactSection) {
//     contactObserver.observe(contactSection);

// }




///////////////// Intersection Observer ////////////////
const goTo = (section) => {
    switch (section) {
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

window.addEventListener("scroll", function() {
    const mobileNav = document.querySelector('.mobile-nav');
    if(mobileNav.classList.contains('reveal-mobile-nav')) {
        return;
    }
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let nav = document.querySelector('#nav-two');

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        nav.classList.remove('fade-in');
        nav.classList.add('fade-out');
    } else {
        // Scrolling up
        nav.classList.remove('fade-out');
        nav.classList.add('fade-in');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});


window.addEventListener('resize', () => {
    if(window.innerWidth > 1050) {
        const mobileNav = document.querySelector('.mobile-nav');
        if(mobileNav.classList.contains('reveal-mobile-nav')) {
            mobileNav.classList.remove('reveal-mobile-nav')
            mobileNav.classList.add('hide-mobile-nav')
        }
    }
})

window.addEventListener('load', () => {
  document.querySelector('.loader-container').style.display = 'none';
})





function smoothScroll(section) {

// const targetId = '.project-mgmt-section'
const targetId = section
const targetPosition = document.querySelector(targetId).offsetTop - 20;
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



const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileNav.classList.contains('reveal-mobile-nav')) {
        mobileNav.classList.remove('reveal-mobile-nav');
        mobileNav.classList.add('hide-mobile-nav');
    } else {
        mobileNav.classList.remove('hide-mobile-nav');
        mobileNav.classList.add('reveal-mobile-nav');
    }
});


// window.addEventListener('load', () => {
//   document.querySelector('.loader-container').style.display = 'none'
// })


document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  document.querySelector('.form-loader-container').style.display = 'grid'

  const data = {
    services: document.getElementById('service-select').value,
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await axios.post('https://nodemailer-gold.vercel.app/sendMessage', data);
    document.querySelector('.form-loader-container').style.display = 'none'
    Swal.fire({
      text: "Message Sent!",
      icon: "success"
    });
  } catch (error) {
    document.querySelector('.form-loader-container').style.display = 'none'
    Swal.fire({
      text: "Message Failed",
      icon: "info"
    });
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
