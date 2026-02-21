import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi';
import { smoothScrollTo } from '../utils/animations';
import { useTypewriter } from '../hooks/useTypewriter';
import './Hero.css';

const Hero = () => {
    const [nameDisplay, setNameDisplay] = useState('');
    const fullText = "Palak Vishwakarma";
    const [showSubtitle, setShowSubtitle] = useState(false);

    const { displayText: subtitleText } = useTypewriter({
        words: [
            'Full Stack Web Developer',
            'DSA & Competitive Programming',
            'MERN Stack Specialist',
            'Java Developer'
        ],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 50,
        delaySpeed: 2000,
    });

    // Typewriter effect for name
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setNameDisplay(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setShowSubtitle(true);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);

    const handleResumeClick = () => {
        window.open('/resume.pdf', '_blank');
    };

    return (
        <section id="home" className="hero">
            <div className="hero-container container">
                <div className="hero-content">
                    {/* Morphing Blob Background */}
                    <div className="hero-blob"></div>

                    {/* Main Content */}
                    <div className="hero-text">
                        <div className="hero-greeting">
                            <span className="greeting-line"></span>
                            <span className="hero-wave">👋</span>
                            <span>Hi, I am</span>
                        </div>

                        <h1 className="hero-name attractive-name">
                            <span className="name-wrapper">{nameDisplay}</span>
                            <span className="cursor-blink">|</span>
                        </h1>

                        {showSubtitle && (
                            <div className="hero-subtitle">
                                <h2 className="text-gradient">
                                    {subtitleText}<span className="cursor-blink">_</span>
                                </h2>
                            </div>
                        )}

                        <p className="hero-description">
                            A passionate Web Developer focused on building high-performance
                            applications with the MERN stack and sharpening problem-solving skills through DSA.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-cta">
                            <button className="btn btn-primary hover-target" onClick={() => smoothScrollTo('projects', 80)}>
                                View Projects
                            </button>
                            <button className="btn btn-glass hover-target" onClick={handleResumeClick}>
                                View Resume
                            </button>
                            <button className="btn btn-glass hover-target" onClick={() => smoothScrollTo('contact', 80)}>
                                Get In Touch
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="hero-social">
                            <a
                                href="https://github.com/palakvishwakarma44"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-social-link hover-target"
                                aria-label="GitHub"
                            >
                                <FiGithub />
                            </a>
                            <a
                                href="https://linkedin.com/in/palak-vishwakarma-18206b306"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hero-social-link hover-target"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href="mailto:palaknaman82@gmail.com"
                                className="hero-social-link hover-target"
                                aria-label="Email"
                                title="palaknaman82@gmail.com"
                            >
                                <FiMail />
                            </a>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="hero-floating-shapes">
                        <div className="floating-shape shape-1"></div>
                        <div className="floating-shape shape-2"></div>
                        <div className="floating-shape shape-3"></div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    className="hero-scroll-indicator hover-target"
                    onClick={() => smoothScrollTo('about', 80)}
                    aria-label="Scroll to About"
                >
                    <FiChevronDown />
                    <span>Scroll Down</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
