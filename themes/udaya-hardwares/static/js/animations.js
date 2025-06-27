// SCROLL ON ANIMATION
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animated-element');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// NUMBER COUNTER ANIMATION
document.addEventListener('DOMContentLoaded', () => {
    // --- General On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animated-element');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // If it's a counting number, also trigger the count
                if (entry.target.classList.contains('counting-number-wrapper')) {
                    const numbersToCount = entry.target.querySelectorAll('.counting-number');
                    numbersToCount.forEach(numElement => {
                        startCountingAnimation(numElement);
                    });
                }
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Number Counting Animation ---

    // Find the parent div for the counting numbers and observe it
    const countingNumberSection = document.querySelector('.what_we_sell_num_section');
    if (countingNumberSection) {
        // Add a class to the parent of the counting numbers so the observer can target it
        // This ensures the counting animation starts when the section itself becomes visible
        countingNumberSection.classList.add('counting-number-wrapper');
        observer.observe(countingNumberSection);
    }


    function startCountingAnimation(element) {
        const target = parseInt(element.dataset.target);
        const suffix = element.dataset.suffix || '';
        const duration = 2000; // 2 seconds
        let start = 0;
        const increment = target / (duration / 10); // Calculate increment based on 10ms interval

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format numbers with commas for thousands if needed
            let displayValue = Math.floor(current);
            if (displayValue >= 1000) {
                 displayValue = displayValue.toLocaleString('en-IN'); // Using Indian locale for consistency
            }


            element.textContent = displayValue + suffix;
        }, 10); // Update every 10ms
    }
});


// HOME PAGE CAROUSEL ANIMATION
document.addEventListener('DOMContentLoaded', function() {

        // Function to apply/remove middle-active class and scaling
        function updateMiddleSlideEffect(swiperInstance) {
            // Remove 'middle-active' from all slides first
            swiperInstance.slides.forEach(slide => {
                slide.classList.remove('middle-active');
                slide.style.transform = 'scale(0.9)'; // Scale down all by default
                if(slide.querySelector('img')) slide.querySelector('img').style.transform = 'scale(1)'; // Reset image scale
            });

            // Find the currently visible slides using Swiper's internal class
            const visibleSlides = swiperInstance.slides.filter(slide => slide.classList.contains('swiper-slide-visible'));

            let middleVisibleSlide = null;

            // Determine the middle slide based on visible slides count
            if (visibleSlides.length >= 3) {
                // For 3 or more visible slides, the middle one is at index 1
                middleVisibleSlide = visibleSlides[1];
            } else if (visibleSlides.length === 2) {
                // For 2 visible slides, let's make the first visible slide pop up (or adjust as desired)
                middleVisibleSlide = visibleSlides[0]; 
            } else if (visibleSlides.length === 1) {
                // For a single visible slide (e.g., mobile), it is the active one
                middleVisibleSlide = visibleSlides[0];
            }

            if (middleVisibleSlide) {
                middleVisibleSlide.classList.add('middle-active'); // Add the custom class
                middleVisibleSlide.style.transform = 'scale(1)'; // Scale up the slide
                if(middleVisibleSlide.querySelector('img')) {
                    middleVisibleSlide.querySelector('img').style.transform = 'scale(1.1)'; // Scale up the image
                }
            }
        }


        // --- Home Page Carousel Initialization ---
        const homeSwiper = new Swiper('.mySanitaryCarousel', {
            loop: true,
            effect: 'slide',
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: { // ADD THIS BLOCK for autoplay
                delay: 3000, // Time in milliseconds (3 seconds) before next slide
                disableOnInteraction: false, // Continue autoplay even if user interacts with carousel
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function () { updateMiddleSlideEffect(this); },
                slideChangeTransitionEnd: function () { updateMiddleSlideEffect(this); },
                afterInit: function() { updateMiddleSlideEffect(this); },
                resize: function() { updateMiddleSlideEffect(this); } // Re-evaluate on resize
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
            }
        });

        // --- About Page Carousel Initialization ---
        const aboutSwiper = new Swiper('.myAboutPageCarousel', {
            loop: true,
            effect: 'slide',
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: { // ADD THIS BLOCK for autoplay as well
                delay: 4000, // You can have a different delay for this carousel (e.g., 4 seconds)
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.about_carousel_next',
                prevEl: '.about_carousel_prev',
            },
            on: {
                init: function () { updateMiddleSlideEffect(this); },
                slideChangeTransitionEnd: function () { updateMiddleSlideEffect(this); },
                afterInit: function() { updateMiddleSlideEffect(this); },
                resize: function() { updateMiddleSlideEffect(this); }
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    });

    // ABOUT PAGE CAROUSEL JS
    document.addEventListener('DOMContentLoaded', function() {

        // Reusable function to apply/remove middle-active class and scaling
        function updateMiddleSlideEffect(swiperInstance) {
            // Remove 'middle-active' from all slides first
            swiperInstance.slides.forEach(slide => {
                slide.classList.remove('middle-active');
                slide.style.transform = 'scale(0.9)'; // Scale down all by default
                if(slide.querySelector('img')) slide.querySelector('img').style.transform = 'scale(1)'; // Reset image scale
            });

            // Find the currently visible slides using Swiper's internal class
            const visibleSlides = swiperInstance.slides.filter(slide => slide.classList.contains('swiper-slide-visible'));

            let middleVisibleSlide = null;

            // Determine the middle slide based on visible slides count
            if (visibleSlides.length >= 3) {
                // For 3 or more visible slides, the middle one is at index 1
                middleVisibleSlide = visibleSlides[1];
            } else if (visibleSlides.length === 2) {
                // For 2 visible slides, you might choose the first one to "pop"
                middleVisibleSlide = visibleSlides[0]; 
            } else if (visibleSlides.length === 1) {
                // For a single visible slide (e.g., mobile), it is the active one
                middleVisibleSlide = visibleSlides[0];
            }

            if (middleVisibleSlide) {
                middleVisibleSlide.classList.add('middle-active'); // Add the custom class
                middleVisibleSlide.style.transform = 'scale(1)'; // Scale up the slide
                if(middleVisibleSlide.querySelector('img')) {
                    middleVisibleSlide.querySelector('img').style.transform = 'scale(1.1)'; // Scale up the image
                }
            }
        }


        // --- Home Page Carousel Initialization (Keep this as is) ---
        const homeSwiper = new Swiper('.mySanitaryCarousel', {
            loop: true,
            effect: 'slide',
            slidesPerView: 3,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function () { updateMiddleSlideEffect(this); },
                slideChangeTransitionEnd: function () { updateMiddleSlideEffect(this); },
                afterInit: function() { updateMiddleSlideEffect(this); },
                resize: function() { updateMiddleSlideEffect(this); }
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
            }
        });

        // --- About Page Carousel Initialization (NEW) ---
        const aboutSwiper = new Swiper('.myAboutPageCarousel', { // Target the unique class
            loop: true,
            effect: 'slide',
            slidesPerView: 3, // Display 3 slides at a time on larger screens
            spaceBetween: 30, // Space between slides
            autoplay: { // Autoplay for about page carousel
                delay: 4000, // You can set a different delay for this carousel
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.about_carousel_next', // Target unique navigation class
                prevEl: '.about_carousel_prev', // Target unique navigation class
            },
            on: {
                init: function () { updateMiddleSlideEffect(this); },
                slideChangeTransitionEnd: function () { updateMiddleSlideEffect(this); },
                afterInit: function() { updateMiddleSlideEffect(this); },
                resize: function() { updateMiddleSlideEffect(this); }
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 30 }
            }
        });
    });

    // LOGO CAROUSEL ANIMATION
    