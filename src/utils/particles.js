/**
 * Particle System for WebGL Background
 * Handles particle creation, movement, and connections
 */

export class ParticleSystem {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];

        // Options with defaults
        this.options = {
            particleCount: options.particleCount || 80,
            particleSize: options.particleSize || 2,
            particleSpeed: options.particleSpeed || 0.5,
            connectionDistance: options.connectionDistance || 150,
            mouseRadius: options.mouseRadius || 200,
            colors: options.colors || ['hsla(270, 95%, 65%, 1)', 'hsla(190, 100%, 50%, 1)', 'hsla(330, 95%, 60%, 1)'],
            ...options,
        };

        this.mouse = { x: null, y: null };
        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * this.options.particleSpeed,
            vy: (Math.random() - 0.5) * this.options.particleSpeed,
            size: Math.random() * this.options.particleSize + 1,
            color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
        };
    }

    updateParticle(particle) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

        // Mouse interaction
        if (this.mouse.x && this.mouse.y) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.options.mouseRadius) {
                const force = (this.options.mouseRadius - distance) / this.options.mouseRadius;
                const angle = Math.atan2(dy, dx);
                particle.vx -= Math.cos(angle) * force * 0.2;
                particle.vy -= Math.sin(angle) * force * 0.2;
            }
        }

        // Apply velocity damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color;

        // Glow effect
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = particle.color;

        this.ctx.fill();
        this.ctx.shadowBlur = 0; // Reset for performance
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.connectionDistance) {
                    const opacity = 1 - distance / this.options.connectionDistance;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);

                    // Gradient-like stroke
                    const strokeStyle = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );

                    // Safe alpha replacement
                    const setAlpha = (color, alpha) => {
                        return color.replace(/[\d.]+\)$/g, `${alpha})`);
                    };

                    const color1 = setAlpha(this.particles[i].color, opacity * 0.4);
                    const color2 = setAlpha(this.particles[j].color, opacity * 0.4);

                    strokeStyle.addColorStop(0, color1);
                    strokeStyle.addColorStop(1, color2);

                    this.ctx.strokeStyle = strokeStyle;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle) => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Draw connections
        this.drawConnections();
    }

    setMousePosition(x, y) {
        this.mouse.x = x;
        this.mouse.y = y;
    }

    destroy() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default ParticleSystem;
