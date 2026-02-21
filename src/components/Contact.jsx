import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const Contact = () => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState(''); // 'success' or 'error'

    const socialLinks = [
        {
            name: 'GitHub',
            icon: <FiGithub />,
            url: 'https://github.com/palakvishwakarma44',
            color: '#333',
        },
        {
            name: 'LinkedIn',
            icon: <FiLinkedin />,
            url: 'https://linkedin.com/in/palak-vishwakarma-18206b306',
            color: '#0077b5',
        },
        {
            name: 'Email',
            icon: <FiMail />,
            url: 'mailto:palaknaman82@gmail.com',
            color: '#ea4335',
        },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('loading');

        const serviceId = 'service_3h6xg5u';
        const templateId = 'template_icxq17z';
        const publicKey = 'EI1jiFXk9ygTxxpIA';

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: 'Palak',
        };

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setFormStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setFormStatus(''), 5000);
            })
            .catch((err) => {
                console.error('FAILED...', err);
                setFormStatus('error');
                setTimeout(() => setFormStatus(''), 5000);
            });
    };

    return (
        <section id="contact" className="contact section" ref={ref}>
            <div className="container">
                <h2 className="section-title">
                    <span className="text-gradient">Get In Touch</span>
                </h2>

                <div className={`contact-content ${isVisible ? 'reveal active' : 'reveal'}`}>
                    <p className="contact-text">
                        I'm currently looking for new opportunities and collaborations. Whether you have a
                        question or just want to say hi, feel free to reach out!
                    </p>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="contact-form glass gradient-border">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <FiUser /> Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    <FiMail /> Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">
                                <FiMessageSquare /> Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                <FiMessageSquare /> Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                rows="6"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn hover-target">
                            <FiSend />
                            <span>Send Message</span>
                        </button>

                        {formStatus === 'loading' && (
                            <div className="form-status loading">
                                ⏳ Sending your message...
                            </div>
                        )}
                        {formStatus === 'success' && (
                            <div className="form-status success">
                                ✨ Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="form-status error">
                                ❌ Failed to send message. Please try again or email me directly at palaknaman82@gmail.com
                            </div>
                        )}
                    </form>

                    {/* Social Links */}
                    <div className="contact-divider">
                        <span>Or connect via</span>
                    </div>

                    <div className="contact-social">
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-social-link glass hover-lift hover-target"
                                aria-label={link.name}
                            >
                                <div className="social-icon">{link.icon}</div>
                                <div className="social-name">{link.name}</div>
                            </a>
                        ))}
                    </div>
                </div>

                <footer className="footer">
                    <p>© {new Date().getFullYear()} Palak Vishwakarma. Built with React & passion ✨</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
