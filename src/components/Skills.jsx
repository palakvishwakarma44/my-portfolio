import {
    FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt,
    FaDatabase, FaCode, FaTerminal, FaJava
} from 'react-icons/fa';
import { SiTailwindcss, SiBootstrap, SiExpress, SiMongodb } from 'react-icons/si';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const Skills = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

    const skillCategories = [
        {
            title: 'Languages',
            skills: [
                { name: 'JavaScript', icon: <FaJs />, level: 90 },
                { name: 'Java (Core & OOP)', icon: <FaJava />, level: 85 },
                { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
                { name: 'CSS3', icon: <FaCss3Alt />, level: 95 },
            ],
        },
        {
            title: 'Frameworks & Libraries',
            skills: [
                { name: 'React', icon: <FaReact />, level: 85 },
                { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90 },
                { name: 'Express.js', icon: <SiExpress />, level: 80 },
                { name: 'Bootstrap', icon: <SiBootstrap />, level: 85 },
            ],
        },
        {
            title: 'MERN & Backend',
            skills: [
                { name: 'Node.js', icon: <FaNodeJs />, level: 75 },
                { name: 'MongoDB', icon: <SiMongodb />, level: 80 },
            ],
        },
        {
            title: 'Tools & Professional',
            skills: [
                { name: 'Git & GitHub', icon: <FaGitAlt />, level: 80 },
                { name: 'Postman', icon: <FaTerminal />, level: 85 },
                { name: 'VS Code', icon: <FaCode />, level: 90 },
                { name: 'DSA & OOP Concepts', icon: null, level: 80 },
            ],
        },
    ];

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">Skills & Expertise</span>
                </h2>

                <div className={`skills-categories ${isVisible ? 'stagger active' : 'stagger'}`}>
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="skill-category glass gradient-border">
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIdx) => (
                                    <div key={skillIdx} className="skill-item">
                                        <div className="skill-header">
                                            {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{
                                                    width: isVisible ? `${skill.level}%` : '0%',
                                                    transitionDelay: `${skillIdx * 0.1}s`,
                                                }}
                                            />
                                        </div>
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

export default Skills;
