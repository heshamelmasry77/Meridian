// Select the necessary elements
const hamburgerIcon = document.querySelector('.navbar__hamburger-icon');
const mobileNav = document.querySelector('.mobile-nav');
const closeIcon = document.querySelector('.mobile-nav__close-icon');
const overlay = document.querySelector('.mobile-nav__overlay');

// Function to open the mobile navigation
const openMobileNav = () => {
    mobileNav.classList.add('mobile-nav--active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
};

// Function to close the mobile navigation
const closeMobileNav = () => {
    mobileNav.classList.remove('mobile-nav--active');
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore background scroll
};

// Event listeners
hamburgerIcon.addEventListener('click', openMobileNav);
closeIcon.addEventListener('click', closeMobileNav);
overlay.addEventListener('click', closeMobileNav);
