import { useState, useEffect } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations
 * Uses Intersection Observer API for performance
 */
export const useScrollReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  const defaultOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px',
    ...options,
  };

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (defaultOptions.triggerOnce) {
          observer.unobserve(ref);
        }
      } else if (!defaultOptions.triggerOnce) {
        setIsVisible(false);
      }
    }, defaultOptions);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, defaultOptions]);

  return [setRef, isVisible];
};

export default useScrollReveal;
