import { FiAward } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Education.css';

const Education = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    const education = [
        {
            degree: 'Bachelor of Technology',
            institution: 'Shri Ram Institute of Technology',
            period: 'July 2023 - July 2027',
            focus: 'Computer Science & Engineering',
        },
        {
            degree: 'Senior Secondary (12th)',
            institution: 'Nachiketa Senior Secondary School',
            period: 'June 2022 - May 2023',
            focus: 'Science Stream',
        },
        {
            degree: 'Secondary (10th)',
            institution: 'Nachiketa Senior Secondary School',
            period: 'January 2020 - June 2021',
            focus: '',
        },
    ];

    return (
        <section id="education" className="education section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">Education</span>
                </h2>

                <div className={`education-grid ${isVisible ? 'stagger active' : 'stagger'}`}>
                    {education.map((edu, idx) => (
                        <div key={idx} className="education-card glass gradient-border">
                            <FiAward className="education-icon" />
                            <h3 className="education-degree">{edu.degree}</h3>
                            <div className="education-institution">{edu.institution}</div>
                            <div className="education-period">{edu.period}</div>
                            {edu.focus && <div className="education-focus">{edu.focus}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
