const comingSoon = (route) => {
    if(route === 'mobile development') {
        window.location.href= './mobileDevelopment.html';
    }

    if(route === 'web app') {
      window.location.href = './webAppDevelopment.html'
    }

    if(route === 'website') {
      window.location.href = './websiteDevelopment.html'
    }

    if(route === 'desktop') {
      window.location.href = './desktopDevelopment.html'
    }
}

function toggleAccordion(element) {
    const body = element.nextElementSibling;
    body.classList.toggle('active');
}

///////////////// Intersection Observer ////////////////

const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
            document.getElementById('li-faqs').style.color = 'black'
             document.getElementById('li-faqs').style.fontWeight = '400'
            document.getElementById('li-testimonials').style.fontWeight = '400'
            document.getElementById('li-testimonials').style.color = 'black';
             document.getElementById('contact-section').style.color = 'black'
             document.getElementById('contact-section').style.fontWeight = '400'
                document.getElementById('li-services').style.fontWeight = '600'
                document.getElementById('li-services').style.color = 'rgb(0, 119, 255)'
    
      } else {
        document.getElementById('li-services').style.fontWeight = '400'
          document.getElementById('li-services').style.color = 'black';
      }
    });
  }, {
    threshold: 0.5,
  });
  
  const serviceSection = document.querySelector('.service-container');

if(serviceSection) {
    servicesObserver.observe(serviceSection);
}

///////////////////////////////////////////////////////////////////////

const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
            document.getElementById('li-faqs').style.color = 'black'
             document.getElementById('li-faqs').style.fontWeight = '400'
            document.getElementById('li-services').style.fontWeight = '400'
            document.getElementById('li-services').style.color = 'black';
             document.getElementById('contact-section').style.color = 'black'
             document.getElementById('contact-section').style.fontWeight = '400'
            document.getElementById('li-testimonials').style.fontWeight = '600'
            document.getElementById('li-testimonials').style.color = 'rgb(0, 119, 255)'
    
      } else {
        document.getElementById('li-testimonials').style.fontWeight = '400'
          document.getElementById('li-testimonials').style.color = 'black';
      }
    });
  }, {
    threshold: 0.5,
  });
  
  const testimonials = document.querySelector('.customer-reviews');

if(testimonials) {
    testimonialObserver.observe(testimonials);
}

///////////////////////////////////////////////////////////////////////////

const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.getElementById('li-services').style.fontWeight = '400'
        document.getElementById('li-services').style.color = 'black';
      document.getElementById('li-testimonials').style.fontWeight = '400'
       document.getElementById('li-testimonials').style.color = 'black'
            document.getElementById('contact-section').style.color = 'black'
             document.getElementById('contact-section').style.fontWeight = '400'
          document.getElementById('li-faqs').style.color = 'rgb(0, 119, 255)'
             document.getElementById('li-faqs').style.fontWeight = '600'
    
      } else {
       document.getElementById('li-faqs').style.color = 'black'
        document.getElementById('li-faqs').style.fontWeight = '400'
      }
    });
  }, {
    threshold: 0.5,
  });
  
  const faqs = document.querySelector('.faq-section');

if(faqs) {
    faqObserver.observe(faqs);
}


/////////////////////////////////////////////////////////////////

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.getElementById('li-services').style.fontWeight = '400'
        document.getElementById('li-services').style.color = 'black';
      document.getElementById('li-testimonials').style.fontWeight = '400'
       document.getElementById('li-testimonials').style.color = 'black'
        document.getElementById('li-faqs').style.color = 'black'
        document.getElementById('li-faqs').style.fontWeight = '400'
          document.getElementById('contact-section').style.color = 'rgb(0, 119, 255)'
             document.getElementById('contact-section').style.fontWeight = '600'
    
      } else {
      document.getElementById('contact-section').style.color = 'black'
             document.getElementById('contact-section').style.fontWeight = '400'
      }
    });
  }, {
    threshold: 0.5,
  });
  
  const contactSection = document.querySelector('.contact-section');

if(contactSection) {
    contactObserver.observe(contactSection);

}




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
if(serviceButton) {
  serviceButton.addEventListener('click', () => {
    smoothScroll('.service-section')
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

  const data = {
    services: document.getElementById('service-select').value,
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
  };

  console.log(data)

  Swal.fire({
    text: "Message Sent!",
    icon: "success"
  });

  // try {
  //   const response = await axios.post('/sendMessage', data);
  //   alert(response.data);
  // } catch (error) {
  //   console.error('There was an error!', error);
  // }
  document.getElementById('contact-form').reset();
});