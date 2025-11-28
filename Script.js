// 1. Footer Year Update
document.getElementById('current-year').textContent = new Date().getFullYear();


// 2. Dynamic Counting Animation Function
function animateCount(element, target) {
    let start = 0;
    const duration = 2500; // 2.5 seconds for a smoother, professional count
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const ratio = Math.min(progress / duration, 1);
        
        // Use a cubic ease-out function for a professional acceleration/deceleration effect
        const easedRatio = 1 - Math.pow(1 - ratio, 3); 
        
        let current = Math.floor(easedRatio * target);
        element.textContent = current.toLocaleString('en-US');

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target.toLocaleString('en-US');
        }
    }
    window.requestAnimationFrame(step);
}

// 3. Intersection Observer for Triggering Animation
const statsSection = document.getElementById('impact');
const statNumbers = document.querySelectorAll('.stat-item .number');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4 // Trigger when 40% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(number => {
                // Ensure animation only runs once
                if (!number.classList.contains('counted')) {
                    const target = parseInt(number.getAttribute('data-target'));
                    animateCount(number, target);
                    number.classList.add('counted');
                }
            });
            // Stop observing once the animation has run
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// 4. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
