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
