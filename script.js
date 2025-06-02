// JavaScript for dynamic effects and functionality

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href'); // Get the href attribute (e.g., "#about")
        const targetElement = document.querySelector(targetId); // Find the corresponding section

        if (targetElement) {
            // Calculate scroll position, adjusting for the fixed header's height
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth' // Smooth scroll animation
            });
        }
    });
});

// Highlight active nav link on scroll
// This adds an 'active' class to the current section's nav link,
// which can be styled in CSS (though not explicitly styled in the provided CSS,
// you can add .nav-links a.active { color: var(--secondary-color); } for example)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Get all section elements
    const navLinks = document.querySelectorAll('.nav-links a'); // Get all navigation links
    const headerHeight = document.querySelector('header').offsetHeight; // Get header height for offset calculation

    sections.forEach(section => {
        // Calculate the current scroll position relative to the top of the viewport
        const top = window.scrollY + headerHeight;
        const offset = section.offsetTop; // Top position of the section
        const height = section.offsetHeight; // Height of the section
        const id = section.getAttribute('id'); // ID of the section

        // Check if the current scroll position is within the bounds of the section
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active'); // Remove 'active' class from all links
                // Add 'active' class to the link corresponding to the current section
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Dynamically update copyright year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Optional: Simple animation on scroll for sections
// This makes sections fade in and slide up slightly as they become visible.
const observerOptions = {
    root: null, // Observe the viewport
    rootMargin: '0px', // No margin around the root
    threshold: 0.2 // Trigger when 20% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the section is intersecting the viewport, animate it
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated to prevent re-triggering
        }
    });
}, observerOptions);

// Apply initial styles and observe all sections (except the hero section)
document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'hero') { // Exclude hero section from this particular animation
        section.style.opacity = 0; // Start with opacity 0 (hidden)
        section.style.transform = 'translateY(50px)'; // Start 50px below its final position
        // Apply transition properties for smooth animation
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section); // Start observing the section
    }
});
