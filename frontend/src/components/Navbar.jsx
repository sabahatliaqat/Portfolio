import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Brand Logo */}
                <a
                    href="/"
                    className="flex items-center gap-2 text-white font-bold text-lg hover:text-primary transition-colors"
                >
                    <Terminal size={22} className="text-primary" />
                    <span>
                        sabahat.liaqat<span className="text-primary">()</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="#skills" className="hover:text-primary transition-colors">
                        Skills
                    </a>
                    <a href="#projects" className="hover:text-primary transition-colors">
                        Projects
                    </a>
                    <a href="#contact" className="hover:text-primary transition-colors">
                        Contact
                    </a>
                </nav>

                {/* Social Links */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title="GitHub"
                    >
                        <FiGithub size={20} />
                    </a>

                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        title="LinkedIn"
                    >
                        <FiLinkedin size={20} />
                    </a>

                    <a
                        href="#contact"
                        className="px-4 py-2 rounded-md bg-primary/10 text-primary border border-primary/30 text-xs font-semibold hover:bg-primary hover:text-dark transition-all duration-200"
                    >
                        Get In Touch
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-400 hover:text-white"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-card border-b border-gray-800 px-6 py-4 space-y-3">
                    <a
                        href="#skills"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-300 hover:text-primary font-medium"
                    >
                        Skills
                    </a>

                    <a
                        href="#projects"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-300 hover:text-primary font-medium"
                    >
                        Projects
                    </a>

                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-300 hover:text-primary font-medium"
                    >
                        Contact
                    </a>

                    <div className="pt-3 border-t border-gray-700 flex items-center gap-5">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white"
                            aria-label="GitHub"
                        >
                            <FiGithub size={20} />
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin size={20} />
                        </a>

                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-primary text-sm"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;