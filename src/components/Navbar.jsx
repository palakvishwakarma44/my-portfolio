import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { smoothScrollTo } from '../utils/animations';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' },
        { id: 'resume', label: 'Resume', isExternal: true },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = navItems.map((item) => ({
                id: item.id,
                offset: document.getElementById(item.id)?.offsetTop || 0,
            }));

            const scrollPosition = window.scrollY + 100;
            const current = sections.reverse().find((section) => scrollPosition >= section.offset);
            if (current) {
                setActiveSection(current.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (item) => {
        if (item.isExternal) {
            window.open('/resume.pdf', '_blank');
        } else {
            smoothScrollTo(item.id, 80);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container container">
                <div className="navbar-logo">
                    <span className="text-gradient">PV</span>
                </div>

                <ul className={`navbar-menu ${isMobileMenuOpen ? 'navbar-menu-open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => handleNavClick(item)}
                                className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
