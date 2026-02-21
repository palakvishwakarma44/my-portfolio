import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiMongodb, SiExpress, SiGoogle } from 'react-icons/si';

import { useScrollReveal } from '../hooks/useScrollReveal';
import './Projects.css';

const Projects = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const projects = [
        {
            title: 'Advanced Virtual Assistant MERN Stack Smart AI',
            description:
                'Intelligence virtual assistant powered by Gemini AI and MERN stack. Features smart conversational replies, custom assistant image uploads, and secure authentication.',
            features: [
                'Gemini AI Integration',
                'Advanced Smart Replies',
                'MERN Stack Architecture',
                'Secure Login & Signup',
                'Custom Assistant Image Upload',
            ],
            technologies: [
                { name: 'MongoDB', icon: <SiMongodb /> },
                { name: 'Express', icon: <SiExpress /> },
                { name: 'React', icon: <SiReact /> },
                { name: 'Node.js', icon: <SiNodedotjs /> },
                { name: 'Gemini AI', icon: <SiGoogle /> },
            ],
            github: '#',
            demo: '#',
        },
        {
            title: 'AI Powered Learning Management System',
            description:
                'A full-stack learning management platform featuring real-time course tracking, interactive student-teacher portals, and AI-driven content suggestions.',
            features: [
                'Full Stack MERN App',
                'Real-time Course Management',
                'Interactive User Dashboards',
                'AI Analysis & Recommendations',
            ],
            technologies: [
                { name: 'React', icon: <SiReact /> },
                { name: 'Node.js', icon: <SiNodedotjs /> },
                { name: 'MongoDB', icon: <SiMongodb /> },
                { name: 'Express', icon: <SiExpress /> },
            ],
            github: '#',
            demo: '#',
        },
        {
            title: 'Freelancing Bidding Platform',
            description:
                'Full-featured freelance marketplace connecting clients with freelancers. Service-based job bidding system with real-time messaging, project management, and contract handling.',
            features: [
                'Project posting and bidding system',
                'Client and freelancer dashboards',
                'Real-time messaging',
                'Contract management and tracking',
            ],
            technologies: [
                { name: 'React', icon: <SiReact /> },
                { name: 'Node.js', icon: <SiNodedotjs /> },
                { name: 'JavaScript', icon: <SiJavascript /> },
            ],
            github: '#',
            demo: '#',
        },
    ];

    return (
        <section id="projects" className="projects section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">Featured Projects</span>
                </h2>

                <div className={`projects-grid ${isVisible ? 'stagger active' : 'stagger'}`}>
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card glass gradient-border hover-lift">
                            <div className="project-header">
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-links">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link hover-target"
                                        aria-label="View on GitHub"
                                    >
                                        <FiGithub />
                                    </a>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link hover-target"
                                        aria-label="View Live Demo"
                                    >
                                        <FiExternalLink />
                                    </a>
                                </div>
                            </div>

                            <p className="project-description">{project.description}</p>

                            <ul className="project-features">
                                {project.features.map((feature, featureIdx) => (
                                    <li key={featureIdx}>{feature}</li>
                                ))}
                            </ul>

                            <div className="project-technologies">
                                {project.technologies.map((tech, techIdx) => (
                                    <div key={techIdx} className="tech-tag" title={tech.name}>
                                        {tech.icon}
                                        <span>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
