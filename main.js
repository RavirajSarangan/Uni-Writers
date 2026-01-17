document.addEventListener('DOMContentLoaded', () => {
    // Advanced Reveal Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Handle staggered children if it's a grid
                const staggers = entry.target.querySelectorAll('.stagger-item');
                staggers.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .services-grid, .grid-stepper').forEach(el => {
        revealObserver.observe(el);
    });

    // Navigation Elements
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Mobile Menu Toggle logic
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (document.body) document.body.classList.toggle('no-scroll');
        });

        if (mobileLinks.length > 0) {
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    if (document.body) document.body.classList.remove('no-scroll');
                });
            });
        }
    }

    // Sticky Header Evolution
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }, { passive: true });
    }

    // Mouse Parallax for Mesh Background
    const mesh = document.querySelector('.mesh-bg');
    if (mesh) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            mesh.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }

    // Magnetic Button Interaction
    const buttons = document.querySelectorAll('.cta-button');
    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0) scale(1.05)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
            });
        });
    }

    // Contact Form V3 Handler with Security
    const contactForm = document.getElementById('simple-contact');
    if (contactForm) {
        const sanitizeInput = (str) => {
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML.trim();
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameEl = document.getElementById('name');
            const moduleEl = document.getElementById('module');
            const messageEl = document.getElementById('message');

            if (!nameEl || !moduleEl || !messageEl) return;

            const name = sanitizeInput(nameEl.value);
            const module = sanitizeInput(moduleEl.value);
            const message = sanitizeInput(messageEl.value);

            if (!name || !module || !message) {
                alert('Please fill in all fields.');
                return;
            }

            const whatsappMsg = `Uni Writers Query\nName: ${name}\nModule: ${module}\nMessage: ${message}`;
            const whatsappUrl = `https://wa.me/94770123447?text=${encodeURIComponent(whatsappMsg)}`;

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }


    // Smooth Scroll Offset V3
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors.length > 0) {
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !targetId) return;
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 40;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
