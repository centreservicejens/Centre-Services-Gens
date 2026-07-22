document.addEventListener('DOMContentLoaded', function() {

    // ===============================================
    // BURGER MENU
    // ===============================================
    const burgerBtn = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (burgerBtn && navLinks) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });
    }

    // ===============================================
    // SCROLL TO SECTION & CLOSE MOBILE MENU
    // ===============================================
    window.scrollToSection = function(id) {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navLinks) {
            navLinks.classList.remove('open');
            if (burgerBtn) {
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        }
    };

    // ===============================================
    // CLOSE MENU ON OUTSIDE CLICK
    // ===============================================
    document.addEventListener('click', (e) => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (!navbar.contains(e.target) && navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            if (burgerBtn) {
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ===============================================
    // DYNAMIC OPENING HOURS
    // ===============================================
    function updateOpeningStatus() {
        const statusBadge = document.getElementById('statusBadge');
        const statusText = document.getElementById('statusText');

        if (!statusBadge || !statusText) return;

        const now = new Date();
        const day = now.getDay();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const time = hours + minutes / 60;

        let isOpen = false;

        if (day >= 2 && day <= 6) {
            if (time >= 10 && time < 13) isOpen = true;
            if (time >= 16 && time < 20) isOpen = true;
        } else if (day === 0) {
            if (time >= 10 && time < 13) isOpen = true;
        }

        if (isOpen) {
            statusBadge.textContent = 'مفتوح الآن';
            statusBadge.className = 'status-badge open';
            statusText.textContent = 'نرحب بكم في المركز';
        } else {
            statusBadge.textContent = 'مغلق حالياً';
            statusBadge.className = 'status-badge closed';
            statusText.textContent = 'تفقد أوقات العمل أدناه';
        }
    }

    updateOpeningStatus();

    // ===============================================
    // CAROUSEL
    // ===============================================
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (wrapper && slides.length) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        let isTransitioning = false;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `انتقل إلى الصورة ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        function goToSlide(index) {
            if (isTransitioning || index === currentIndex) return;
            isTransitioning = true;
            
            currentIndex = index;
            updateCarousel();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 700);
        }

        function updateCarousel() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prevIndex);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            }
        });

        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            } else {
                startAutoPlay();
            }
        }, { passive: true });

        startAutoPlay();
    }

    // ===============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ===============================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all elements
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // ===============================================
    // COUNTER ANIMATION (Hero Stats)
    // ===============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => counterObserver.observe(stat));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 40);
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + '+';
        }, stepTime);
    }

    // ===============================================
    // BACK TO TOP BUTTON
    // ===============================================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===============================================
    // NAVBAR SCROLL EFFECT
    // ===============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(14, 31, 26, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(14, 31, 26, 0.92)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

});