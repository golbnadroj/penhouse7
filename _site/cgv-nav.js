// CGV Navigation - Smooth scrolling and active section highlighting
// Manages the glass navigation panel behavior on the CGV page
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Handle smooth scrolling when navigation links are clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const headerOffset = 100; // Account for sticky header height
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });

  // Highlight the active section in the navigation based on scroll position
  const highlightActiveSection = () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150; // Offset for better UX

    // Find the current section
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if we're in this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // If no section is found, find the closest one
    if (!current) {
      if (window.pageYOffset < 300) {
        // Near top - use first section
        current = sections[0]?.getAttribute('id') || '';
      } else {
        // Find the section we just passed
        let bestSection = null;
        let bestDistance = Infinity;
        
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (sectionTop <= scrollPosition) {
            const distance = scrollPosition - sectionTop;
            if (distance < bestDistance) {
              bestDistance = distance;
              bestSection = section;
            }
          }
        });
        
        current = bestSection?.getAttribute('id') || '';
      }
    }

    // Apply highlighting to navigation links
    navLinks.forEach((link) => {
      const dot = link.querySelector('div');
      const linkSection = link.getAttribute('data-section');
      
      if (!dot) return;

      if (linkSection === current) {
        // Apply active styles
        link.style.backgroundColor = 'rgba(191, 149, 58, 0.1)'; // or-gold with 10% opacity
        link.style.color = '#bf953a'; // or-gold
        dot.style.backgroundColor = '#bf953a'; // or-gold
      } else {
        // Correctly reset styles using explicit default values
        link.style.backgroundColor = 'transparent';
        link.style.color = 'inherit';
        dot.style.backgroundColor = '#d1d5db'; // gray-300
      }
    });
  };

  // Initialize highlighting on page load
  highlightActiveSection();
  
  // Re-initialize after a short delay to ensure everything is loaded
  setTimeout(() => {
    highlightActiveSection();
  }, 100);

  // Update highlighting on scroll with performance optimization
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Handle smooth scrolling for mobile table of contents links
  const mobileLinks = document.querySelectorAll('.lg\\:hidden a[href^="#"]');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      const headerOffset = 100;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });
}); 