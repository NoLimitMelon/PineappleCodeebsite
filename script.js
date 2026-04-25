const menuToggle = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('#nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// 1. Toggle Sidebar and Animate Hamburger
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

// 2. Section Switching Logic
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active state from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active state to clicked link
        link.classList.add('active');

        // Hide all sections and show the target one
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Close Sidebar and Reset Hamburger
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});
