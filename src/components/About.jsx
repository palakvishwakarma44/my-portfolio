import { useRef, useEffect, useState } from 'react';
import { FiAward, FiCode, FiTrendingUp } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { animateCounter } from '../utils/animations';
import './About.css';

const About = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const projectsRef = useRef(null);
    const techRef = useRef(null);

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            if (projectsRef.current) animateCounter(projectsRef.current, 3);
            if (techRef.current) animateCounter(techRef.current, 4);
            setHasAnimated(true);
        }
    }, [isVisible, hasAnimated]);

    return (
        <section id="about" className="about section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">About Me</span>
                </h2>

                <div className={`about-content ${isVisible ? 'reveal active' : 'reveal'}`}>
                    <div className="about-text">
                        <p className="about-description">
                            I'm a <strong>passionate web developer</strong> with a solid understanding of{' '}
                            <span className="text-gradient-neon">Object-Oriented Programming</span> and{' '}
                            <span className="text-gradient-neon">Data Structures & Algorithms</span>.
                        </p>
                        <p className="about-description">
                            I specialize in building sophisticated web applications using{' '}
                            <strong>HTML, CSS, React</strong>, and modern JavaScript. My focus is on writing{' '}
                            <strong>clean, maintainable code</strong> and creating performant, user-centric
                            applications with cutting-edge UI/UX design.
                        </p>
                        <p className="about-description">
                            Currently pursuing my <strong>B.Tech in Computer Science</strong>, I'm constantly
                            learning and pushing the boundaries of web development to create digital experiences
                            that truly inspire.
                        </p>

                        {/* Stats */}
                        <div className="about-stats">
                            <div className="stat-card glass gradient-border">
                                <FiCode className="stat-icon" />
                                <div className="stat-value" ref={projectsRef}>
                                    3
                                </div>
                                <div className="stat-label">Projects Completed</div>
                            </div>

                            <div className="stat-card glass gradient-border">
                                <FiAward className="stat-icon" />
                                <div className="stat-value" ref={techRef}>
                                    0
                                </div>
                                <div className="stat-label">Technologies Mastered</div>
                            </div>

                            <div className="stat-card glass gradient-border">
                                <FiTrendingUp className="stat-icon" />
                                <div className="stat-value">100%</div>
                                <div className="stat-label">Commitment</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
