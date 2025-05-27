document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle 
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links'); 

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active'); 
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    document.body.classList.add('mobile-menu-active');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    document.body.classList.remove('mobile-menu-active');
                }
            }
        });

        const mobileNavLinks = navLinks.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active') && (this.getAttribute('href').startsWith('#') || this.getAttribute('href').includes('.html'))) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    document.body.classList.remove('mobile-menu-active'); 
                }
            });
        });

        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.classList.remove('mobile-menu-active');
            }
        });
    }

    // --- Hero Slider (Redesigned) ---
    const heroSlider = document.querySelector('.new-hero-section.hero-slider-active');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide-item');
        const dotsContainer = heroSlider.querySelector('.hero-slider-dots');
        const prevButton = heroSlider.querySelector('.hero-slider-nav-prev');
        const nextButton = heroSlider.querySelector('.hero-slider-nav-next');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            updateDots(index);
            currentSlide = index;
        }

        function nextSlide() {
            let newSlide = (currentSlide + 1) % slides.length;
            showSlide(newSlide);
        }

        function prevSlide() {
            let newSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(newSlide);
        }
        
        function updateDots(index) {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = ''; 
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === index) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    showSlide(i);
                    resetSlideInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function startSlideInterval() {
            clearInterval(slideInterval); 
            slideInterval = setInterval(nextSlide, 7000); 
        }
        function resetSlideInterval() {
            startSlideInterval();
        }

        if (slides.length > 0) {
            if (prevButton) prevButton.addEventListener('click', () => {
                prevSlide();
                resetSlideInterval();
            });
            if (nextButton) nextButton.addEventListener('click', () => {
                nextSlide();
                resetSlideInterval();
            });

            showSlide(0); 
            startSlideInterval();
        }
    }


    // Programs & Events Slider
    const programsSliderEl = document.querySelector('.programs-events-slider-section .programs-slider');
    if (programsSliderEl) {
        const programSlides = programsSliderEl.querySelectorAll('.program-slide');
        const programsDotsContainer = document.querySelector('.programs-events-slider-section .programs-slider-dots');
        let currentProgramSlideIndex = 0;
        let programsInterval; // Variable for the auto-scroll interval
        const autoScrollDelay = 5000; // 5 seconds

        if (programSlides.length > 0) {
            const totalProgramPages = programSlides.length;

            function showProgramPage(index) {
                programSlides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
                updateProgramDots(index);
                currentProgramSlideIndex = index;
            }
            
            function nextProgramPage() {
                currentProgramSlideIndex = (currentProgramSlideIndex + 1) % totalProgramPages;
                showProgramPage(currentProgramSlideIndex);
            }

            function prevProgramPage() {
                currentProgramSlideIndex = (currentProgramSlideIndex - 1 + totalProgramPages) % totalProgramPages;
                showProgramPage(currentProgramSlideIndex);
            }

            function updateProgramDots(index) {
                if (!programsDotsContainer) return;
                programsDotsContainer.innerHTML = ''; 
                for (let i = 0; i < totalProgramPages; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === index) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        showProgramPage(i);
                        resetProgramsInterval(); // Reset interval on dot click
                    });
                    programsDotsContainer.appendChild(dot);
                }
            }

            function startProgramsInterval() {
                clearInterval(programsInterval); // Clear existing interval
                programsInterval = setInterval(nextProgramPage, autoScrollDelay);
            }

            function resetProgramsInterval() {
                startProgramsInterval(); // This will clear and restart the interval
            }
            
            const programsPrevButton = document.querySelector('.programs-events-slider-section .programs-prev');
            const programsNextButton = document.querySelector('.programs-events-slider-section .programs-next');

            if(programsPrevButton) {
                programsPrevButton.addEventListener('click', () => {
                    prevProgramPage();
                    resetProgramsInterval(); // Reset interval on manual navigation
                });
            }
            if(programsNextButton) {
                programsNextButton.addEventListener('click', () => {
                    nextProgramPage();
                    resetProgramsInterval(); // Reset interval on manual navigation
                });
            }

            if (totalProgramPages > 0) {
                showProgramPage(0); 
                startProgramsInterval(); // Start auto-scrolling
            }
        }
    }


    // Bible Quotes Slider (Existing)
    const quotesSliderEl = document.querySelector('.bible-quotes-slider-section .quotes-slider');
    if (quotesSliderEl) {
        const quotesSlides = quotesSliderEl.querySelectorAll('.quote-slide');
        const quotesDotsContainer = document.querySelector('.bible-quotes-slider-section .quotes-slider-dots');
        let currentQuoteSlide = 0;
        let quoteInterval;

        if (quotesSlides.length > 0) {
            function showQuoteSlide(index) {
                quotesSlides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                updateQuoteDots(index);
                currentQuoteSlide = index;
            }

            function nextQuoteSlide() {
                currentQuoteSlide = (currentQuoteSlide + 1) % quotesSlides.length;
                showQuoteSlide(currentQuoteSlide);
            }
            
            function updateQuoteDots(index) {
                if (!quotesDotsContainer) return;
                quotesDotsContainer.innerHTML = ''; 
                quotesSlides.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === index) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        showQuoteSlide(i);
                        resetQuoteInterval();
                    });
                    quotesDotsContainer.appendChild(dot);
                });
            }

            function startQuoteInterval() {
                clearInterval(quoteInterval); 
                quoteInterval = setInterval(nextQuoteSlide, 6000); 
            }
            function resetQuoteInterval() {
                startQuoteInterval();
            }
            
            if (quotesSlides.length > 0) {
                showQuoteSlide(0); 
                startQuoteInterval();
            }
        }
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault(); 
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
