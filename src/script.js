document.addEventListener('DOMContentLoaded', () => {

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- CGV Side Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length && sections.length) {
        // Smooth scroll for sidebar links
        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (!targetSection) return;

                const headerOffset = 100; // Sticky header height
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            });
        });

        // Highlight active section based on scroll position
        const highlightActiveSection = () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 150; // Offset for better UX

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            if (!current) {
                if (window.pageYOffset < 300) {
                    current = sections[0]?.getAttribute('id') || '';
                } else {
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

            navLinks.forEach((link) => {
                const dot = link.querySelector('div');
                const linkSection = link.getAttribute('data-section');
                if (!dot) return;

                if (linkSection === current) {
                    link.style.backgroundColor = 'rgba(191, 149, 58, 0.1)';
                    link.style.color = '#bf953a';
                    dot.style.backgroundColor = '#bf953a';
                } else {
                    link.style.backgroundColor = 'transparent';
                    link.style.color = 'inherit';
                    dot.style.backgroundColor = '#d1d5db';
                }
            });
        };

        // Initial highlight and subsequent updates
        highlightActiveSection();
        setTimeout(highlightActiveSection, 100);

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

        // Smooth scroll for mobile table-of-contents links
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
    }
});
