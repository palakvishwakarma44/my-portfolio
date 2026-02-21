import { useEffect, useRef, useState } from 'react';

import { useMousePosition } from '../hooks/useMousePosition';
import { lerp } from '../utils/animations';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const mousePosition = useMousePosition();
    const cursorPosition = useRef({ x: 0, y: 0 });
    const requestRef = useRef();

    // Check if device has mouse
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth cursor follow with lerp
    useEffect(() => {
        if (isMobile) return;

        const animate = () => {
            cursorPosition.current.x = lerp(cursorPosition.current.x, mousePosition.x, 0.15);
            cursorPosition.current.y = lerp(cursorPosition.current.y, mousePosition.y, 0.15);

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
            }

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [mousePosition, isMobile]);

    // Handle hover states
    useEffect(() => {
        if (isMobile) return;

        const handleMouseover = (e) => {
            if (e.target.matches('a, button, .hover-target')) {
                cursorRef.current?.classList.add('cursor-hover');
            }
        };

        const handleMouseout = (e) => {
            if (e.target.matches('a, button, .hover-target')) {
                cursorRef.current?.classList.remove('cursor-hover');
            }
        };

        document.addEventListener('mouseover', handleMouseover);
        document.addEventListener('mouseout', handleMouseout);

        return () => {
            document.removeEventListener('mouseover', handleMouseover);
            document.removeEventListener('mouseout', handleMouseout);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={cursorDotRef} className="custom-cursor-dot" />
        </>
    );
};

export default CustomCursor;
