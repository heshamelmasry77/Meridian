document.querySelector('.navbar__hamburger-icon').addEventListener('click', function () {
    document.querySelector('.mobile-nav').classList.add('mobile-nav--active');
});

document.querySelector('.mobile-nav__close-icon').addEventListener('click', function () {
    document.querySelector('.mobile-nav').classList.remove('mobile-nav--active');
});
