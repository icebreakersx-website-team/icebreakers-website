document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
        });
    }

    // 2. FAQ ACCORDION LOGIC
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });

    // 3. CONTACT FORM VALIDATION
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

            const name = document.getElementById('name');
            if (!name.value.trim()) { document.getElementById('nameError').style.display = 'block'; isValid = false; }

            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) { document.getElementById('emailError').style.display = 'block'; isValid = false; }

            const message = document.getElementById('message');
            if (!message.value.trim()) { document.getElementById('messageError').style.display = 'block'; isValid = false; }

            if (isValid) {
                contactForm.style.display = 'none';
                successMsg.style.display = 'block';
                contactForm.reset();
            }
        });
    }

    // 4. ROI CALCULATOR
    const slider = document.getElementById('orderSlider');
    const display = document.getElementById('orderDisplay');
    const result = document.getElementById('revenueResult');

    if (slider && display && result) {
        function calculateROI() {
            const orders = parseInt(slider.value);
            const avgPrice = 12; 
            const days = 365;
            const uplift = 0.15;
            const annualPotential = (orders * avgPrice * days * uplift);
            const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualPotential);
            display.textContent = orders;
            result.textContent = formatted;
        }
        slider.addEventListener('input', calculateROI);
        calculateROI(); 
    }

    // 5. SCROLL ANIMATIONS (Fade In)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                if(entry.target.classList.contains('quote-animate')) {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.card, .hero-content, .grid-2 > div, .pricing-box, .timeline-item, .quote-animate').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // 6. COMPASS SPIN ON SCROLL
    const compass = document.querySelector('.spin-on-scroll');
    if (compass) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            compass.style.transform = `rotate(${scrollPos / 5}deg)`;
        });
    }

    // 7. HERO VIDEO SPEED CONTROL
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.6; // 0.6 = 60% speed. Change to 0.5 for half speed.
    }
});