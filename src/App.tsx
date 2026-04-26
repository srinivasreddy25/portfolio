import React from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Confetti from './components/Confetti';
import AnimatedBackground from './components/AnimatedBackground';

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#0d1117', position: 'relative' }}>
      <AnimatedBackground />
      <Confetti />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </Box>
    </Box>
  );
};

export default App;
