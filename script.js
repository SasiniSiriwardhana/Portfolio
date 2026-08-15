document.addEventListener('DOMContentLoaded', () => {

    // ── 1. MOBILE MENU ──
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    let menuOpen = false;

    hamburger.addEventListener('click', () => {
        menuOpen = !menuOpen;
        hamburger.classList.toggle('active', menuOpen);
        mobileMenu.classList.toggle('active', menuOpen);
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ── 2. STICKY NAV & ACTIVE LINK ──
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const onScroll = () => {
        // Sticky nav
        navbar.classList.toggle('scrolled', window.scrollY > 60);

        // Active link
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 3. SCROLL REVEAL ANIMATIONS ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => observer.observe(el));

    // ── 4. CONTACT FORM ──
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) {
                formMsg.textContent = 'Please fill in all fields.';
                formMsg.className = 'form-msg error';
                return;
            }
            const btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = '<span>✓ Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
            btn.style.color = '#fff';
            formMsg.textContent = 'Thank you! I will get back to you soon.';
            formMsg.className = 'form-msg success';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = '<span>Send Message</span> <span class="send-arrow">→</span>';
                btn.style.background = '';
                btn.style.color = '';
                formMsg.textContent = '';
                formMsg.className = 'form-msg';
            }, 5000);
        });
    }

    // ── 5. CURRENT YEAR IN FOOTER ──
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── 6. TYPEWRITER EFFECT ──
    const roles = [
        'Agile & Scrum Enthusiast',
        'Full-Stack Developer',
        'MIT Undergraduate',
        'Tech Writer',
        'Aspiring Project Manager'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeTarget = document.getElementById('typewriter');

    function typeEffect() {
        if (!typeTarget) return;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typeTarget.textContent = currentRole.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            typeTarget.textContent = currentRole.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }

    setTimeout(typeEffect, 600);
});
