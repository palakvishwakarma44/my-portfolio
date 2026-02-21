import { FiCalendar } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Experience.css';

const Experience = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    const experiences = [{
        role: 'Web Developer',
        type: 'Self-driven Projects',
        period: '2023 - Present',
        responsibilities: [
            'Created multiple web-based samples and GUI applications',
            'Built responsive web applications using HTML, CSS, and modern design techniques',
            'Developed interactive React applications with enhanced user experience',
            'Focused on clean code architecture and performance optimization',
        ],
    }];

    return (
        <section id="experience" className="experience section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">Experience</span>
                </h2>

                <div className={`timeline ${isVisible ? 'stagger active' : 'stagger'}`}>
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="timeline-item glass gradient-border">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                <h3 className="experience-role">{exp.role}</h3>
                                <div className="experience-company">{exp.type}</div>
                                <div className="experience-period">
                                    <FiCalendar />
                                    <span>{exp.period}</span>
                                </div>
                                <ul className="experience-responsibilities">
                                    {exp.responsibilities.map((item, itemIdx) => (
                                        <li key={itemIdx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
