import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './BackToTop.css';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`back-to-top hover-target ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Back to top"
        >
            <FiArrowUp />
        </button>
    );
};

export default BackToTop;
