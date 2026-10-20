import React from 'react';
import { Terminal, Bot } from 'lucide-react';

const Hero = ({ onOpenChat }) => {
    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-gray-700 text-sm font-medium text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Building AI-Powered Applications
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                    Hi, I'm <span className="text-primary">Sabahat Liaqat</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    AI Engineer specializing in{' '}
                    <span className="text-white font-semibold">
                        Generative AI, LLMs, and RAG
                    </span>
                    . I build AI-powered chatbots and applications using Python and FastAPI.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="#projects"
                        className="flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-dark font-bold hover:bg-emerald-500 transition-colors duration-200"
                    >
                        <Terminal size={20} />
                        View Projects
                    </a>

                    <button
                        type="button"
                        onClick={onOpenChat}
                        className="flex items-center gap-2 px-8 py-4 rounded-lg bg-card text-white font-semibold border border-gray-700 hover:border-primary transition-colors duration-200"
                    >
                        <Bot size={20} className="text-primary" />
                        Chat with my Resume
                    </button>
                </div>

                <div className="pt-12 flex items-center justify-center gap-6 text-gray-500 text-sm font-medium">
                    <p>Powered by:</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <span>Python</span>
                        <span>•</span>
                        <span>FastAPI</span>
                        <span>•</span>
                        <span>RAG</span>
                        <span>•</span>
                        <span>React</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;