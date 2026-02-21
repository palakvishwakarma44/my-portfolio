/**
 * Animation utility functions and easing formulas
 */

// Easing functions
export const easing = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};

// Lerp (Linear Interpolation)
export const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
};

// Map value from one range to another
export const map = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Clamp value between min and max
export const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};

// Random number in range
export const random = (min, max) => {
    return Math.random() * (max - min) + min;
};

// Random integer in range
export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Distance between two points
export const distance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
};

// Animate counter (for statistics)
export const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(easing.easeOutCubic(progress) * (target - start) + start);

        if (element) {
            element.textContent = current;
        }

        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (element) {
            element.textContent = target;
        }
    };

    requestAnimationFrame(step);
};

// Smooth scroll to element
export const smoothScrollTo = (targetId, offset = 0) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        window.scrollTo(0, startPosition + distance * easing.easeInOutCubic(percentage));

        if (progress < duration) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

// Add ripple effect to element
export const addRippleEffect = (event, element) => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// Debounce function
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
export const throttle = (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

// Check if element is in viewport
export const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
};

export default {
    easing,
    lerp,
    map,
    clamp,
    random,
    randomInt,
    distance,
    animateCounter,
    smoothScrollTo,
    addRippleEffect,
    debounce,
    throttle,
    isInViewport,
};
