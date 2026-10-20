import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';

const Home = ({ onOpenChat }) => {
    return (
        <main>
            <Hero onOpenChat={onOpenChat} />
            <Skills />
            <Projects />
            <Experience />
            <Education />
        </main>
    );
};

export default Home;