/* ============================================================
   TanBuiDev Portfolio — Main JavaScript
   Handles: Navbar, Typewriter, Fade-in, Counter, Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('.section, .hero');
    const navLinkEls = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinkEls.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observerNav.observe(section));

    // ── Typewriter effect ──
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Fullstack Developer',
        'AI Enthusiast',
        'Problem Solver',
        'Spring Boot + React',
        'Building Smart Web Apps'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 300; // Pause before next phrase
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ── Fade-in on scroll (Intersection Observer) ──
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerFade = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Also make children visible if parent is a grid
                const children = entry.target.querySelectorAll('.about-card, .skill-category, .project-card');
                children.forEach(child => child.classList.add('visible'));
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observerFade.observe(el));

    // ── Animated counter ──
    const counters = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const start = performance.now();

                    function updateCounter(timestamp) {
                        const elapsed = timestamp - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        counter.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateCounter);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observerCounter.observe(statsSection);

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Skill badge hover ripple ──
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function () {
            this.style.setProperty('--badge-scale', '1.05');
        });
        badge.addEventListener('mouseleave', function () {
            this.style.setProperty('--badge-scale', '1');
        });
    });
});

// ── Contact form handler ──
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="ph ph-check-circle"></i> Đã gửi thành công!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
    }, 3000);

    return false;
}
