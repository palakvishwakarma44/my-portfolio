import { useEffect, useRef } from 'react';
import ParticleSystem from '../utils/particles';
import { useMousePosition } from '../hooks/useMousePosition';
import './WebGLBackground.css';

const WebGLBackground = () => {
    const canvasRef = useRef(null);
    const particleSystemRef = useRef(null);
    const mousePosition = useMousePosition();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.getContext) return;

        // Initialize particle system
        particleSystemRef.current = new ParticleSystem(canvas, {
            particleCount: window.innerWidth < 768 ? 40 : 80,
            particleSpeed: 0.3,
            connectionDistance: 150,
        });

        // Animation loop
        let animationId;
        const animate = () => {
            particleSystemRef.current.animate();
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            particleSystemRef.current.resize();
            particleSystemRef.current.init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            particleSystemRef.current?.destroy();
        };
    }, []);

    // Update mouse position
    useEffect(() => {
        if (particleSystemRef.current) {
            particleSystemRef.current.setMousePosition(mousePosition.x, mousePosition.y);
        }
    }, [mousePosition]);

    return <canvas ref={canvasRef} className="webgl-background" />;
};

export default WebGLBackground;
