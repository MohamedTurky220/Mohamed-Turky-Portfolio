// Prevent browser from restoring old scroll position
history.scrollRestoration = 'manual';


// ===============================
// Navigation
// ===============================

const navLinks = document.querySelectorAll('.nav nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');


// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener('click', e => {

    const target = document.querySelector(
      link.getAttribute('href')
    );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Update active navigation immediately
    if (link.closest('.nav nav')) {

      navLinks.forEach(item => {
        item.classList.remove('active');
      });

      link.classList.add('active');
    }

    // Close mobile menu
    closeMobileMenu();

  });

});


// ===============================
// Active Navigation While Scrolling
// ===============================

function updateActiveNav() {

  const scrollPosition = window.scrollY + 250;

  let currentSection = '';

  sections.forEach(section => {

    const sectionTop = section.offsetTop;
    const sectionBottom =
      sectionTop + section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionBottom
    ) {
      currentSection = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${currentSection}`
    );

  });

}


// ===============================
// Mobile Menu
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');


function closeMobileMenu() {

  if (!menuToggle || !mobileMenu) return;

  menuToggle.classList.remove('open');

  mobileMenu.classList.remove('open');

  menuToggle.setAttribute(
    'aria-expanded',
    'false'
  );

  mobileMenu.setAttribute(
    'aria-hidden',
    'true'
  );

}


function openMobileMenu() {

  if (!menuToggle || !mobileMenu) return;

  menuToggle.classList.add('open');

  mobileMenu.classList.add('open');

  menuToggle.setAttribute(
    'aria-expanded',
    'true'
  );

  mobileMenu.setAttribute(
    'aria-hidden',
    'false'
  );

}


if (menuToggle && mobileMenu) {

  menuToggle.addEventListener('click', () => {

    const isOpen =
      menuToggle.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }

  });


  // Close menu when clicking a mobile link
  mobileMenu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {
      closeMobileMenu();
    });

  });

}


// ===============================
// Scroll Event
// ===============================

window.addEventListener(
  'scroll',
  updateActiveNav
);


// ===============================
// Resize Event
// ===============================

window.addEventListener('resize', () => {

  // Close mobile menu when returning to desktop
  if (window.innerWidth > 850) {
    closeMobileMenu();
  }

});


// ===============================
// Page Load
// ===============================

window.addEventListener('load', () => {

  window.scrollTo(0, 0);

  updateActiveNav();

  closeMobileMenu();

});