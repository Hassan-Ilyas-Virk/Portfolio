"use client";

import Scene3D from '../components/Scene3D';
import Navbar from '../components/Navbar';
import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity } from 'framer-motion';
import { ArrowDownIcon, CodeBracketIcon, CommandLineIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const InfiniteText = () => {
  const phrases = [
    // English
    "Flexible to pursue our idea ",
    // Chinese (Simplified)
    "灵活追求我们的想法",
    // Japanese
    "柔軟にアイデアを追求する"
  ];

  // Function to generate random number within range
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Generate 14 rows with random configurations
  const rowConfigs = Array.from({ length: 14 }, (_, i) => ({
    speed: getRandomInRange(40, 140),
    size: getRandomInRange(30, 40),
    opacity: (getRandomInRange(10, 30) / 100).toFixed(2),
    phrase: phrases[i % phrases.length]
  }));

  return (
    <div style={{
      position: 'fixed',
      top: '-20%',
      left: '-20%',
      width: '140%',
      height: '140%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
      transform: 'rotate(-15deg)',
      transformOrigin: 'center center'
    }}>
      {rowConfigs.map((config, rowIndex) => (
        <div
          key={rowIndex}
          className="infinite-text"
          style={{
            position: 'absolute',
            top: `${30 + rowIndex * 4}%`,
            left: 0,
            whiteSpace: 'nowrap',
            display: 'flex',
            gap: '0.1rem',
            animation: `scrollText ${config.speed}s linear infinite`,
            color: `rgba(255, 255, 255, ${config.opacity})`,
            fontSize: `${config.size}px`,
            width: '400%',
            transform: `translateY(calc(var(--scroll) * ${-5 * (rowIndex + 1)}px))`,
            opacity: `calc(0.8 - var(--scroll) * 0.1)`,
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
          }}
        >
          {/* Repeat the phrase many times for seamless infinite effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{config.phrase}{' • '}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  // Get velocity for dynamic trail effect
  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll', window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY;

      // Find the section that's currently in view
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const { top, bottom } = element.getBoundingClientRect();
        const offset = window.innerHeight * 0.3; // 30% of viewport height
        
        return top <= offset && bottom >= offset;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Corrected transform ranges for opposite movement
  const textX = useTransform(springX, [-10, 10], [30, -30]); // Inverted
  const textY = useTransform(springY, [-10, 10], [30, -30]); // Inverted
  const subtitleX = useTransform(springX, [-10, 10], [20, -20]); // Inverted
  const subtitleY = useTransform(springY, [-10, 10], [20, -20]); // Inverted

  // Enhanced dynamic trail effect based on movement
  const trailIntensity = useTransform(
    [velocityX, velocityY],
    ([vx, vy]) => {
      const totalVelocity = Math.sqrt(vx * vx + vy * vy);
      return Math.min(totalVelocity / 30, 2); // Increased max intensity to 2
    }
  );

  // Scroll-based animations
  const backgroundY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Content sections visibility based on scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [50, 0]);

  return (
    <>
      <div className="navbar">
        <motion.div 
          className="nav-logo-container"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
          }}
        >
          <span className="nav-logo">
            Hassan
          </span>
        </motion.div>
        <div className="nav-links-container">
          <div className="nav-links">
            <Link 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => setActiveSection('home')}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => setActiveSection('about')}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={() => setActiveSection('projects')}
            >
              Projects
            </Link>
            <Link 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => setActiveSection('contact')}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <InfiniteText />
      <motion.div 
        className="background-logo-text background-text"
        aria-hidden="true"
        style={{
          x: textX,
          y: textY,
          translateY: backgroundY,
          opacity: backgroundOpacity,
          rotate: -15
        }}
      >
        <motion.span className="background-text"
          style={{
            x: textX,
            y: textY,
            fontSize: '40vw',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            lineHeight: 1,
            color: 'white',
            textShadow: useTransform(
              trailIntensity,
              (intensity) => intensity > 0.05 ? `
                -${4 * intensity}px -${4 * intensity}px 0 #ff0080,
                -${8 * intensity}px -${8 * intensity}px 0 #ff4000,
                -${12 * intensity}px -${12 * intensity}px 0 #ff8000,
                -${16 * intensity}px -${16 * intensity}px 0 #ffff00,
                -${20 * intensity}px -${20 * intensity}px 0 #80ff00,
                -${24 * intensity}px -${24 * intensity}px 0 #00ff80,
                -${28 * intensity}px -${28 * intensity}px 0 #0080ff,
                -${32 * intensity}px -${32 * intensity}px 0 #8000ff
              ` : 'none'
            )
          }}
        >
          FLEXIBLE
        </motion.span>
        <motion.span 
          className="subtitle"
          style={{
            x: subtitleX,
            y: subtitleY,
            fontSize: '5vw',
            fontWeight: 700,
            letterSpacing: '0.01em',
            marginTop: '1vw',
            textTransform: 'none',
          }}
        >
          to pursue our ideal.
        </motion.span>
      </motion.div>
      <Scene3D 
        key="new-skull-model"
        className="scene-container"
        mouseX={springX}
        mouseY={springY}
      />
      
      {/* All content now scrolls over the 3D background */}
      <motion.main 
        className="container main-content"
        style={{
          opacity: contentOpacity,
          y: contentY
        }}
      >
        {/* Hero Section */}
        <section 
          className="hero-section"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Remove the text from here, now in background */}
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about"
          className="glass-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-gradient">About Me</h2>
          <p className="about-text">
            I'm a passionate developer with expertise in modern web technologies.
            I love creating beautiful and functional applications that make a difference.
          </p>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="icon-container">
                <CodeBracketIcon className="icon blue" />
              </div>
              <h3>Frontend Development</h3>
              <p>React, Next.js, CSS</p>
            </div>
            <div className="skill-card">
              <div className="icon-container">
                <CommandLineIcon className="icon green" />
              </div>
              <h3>Backend Development</h3>
              <p>Node.js, Express, MongoDB</p>
            </div>
            <div className="skill-card">
              <div className="icon-container">
                <DevicePhoneMobileIcon className="icon purple" />
              </div>
              <h3>Mobile Development</h3>
              <p>React Native, Flutter</p>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="glass-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-gradient">Projects</h2>
          <div className="projects-grid">
            <motion.div
              className="project-card"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3>Project 1</h3>
              <p>Description of your first project</p>
              <div className="project-tags">
                <span className="tag react">React</span>
                <span className="tag nextjs">Next.js</span>
              </div>
            </motion.div>
            <motion.div
              className="project-card"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3>Project 2</h3>
              <p>Description of your second project</p>
              <div className="project-tags">
                <span className="tag nodejs">Node.js</span>
                <span className="tag mongodb">MongoDB</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact"
          className="glass-section hero"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-gradient">Get in Touch</h2>
          <p>Feel free to reach out for collaborations or just a friendly chat!</p>
          <a href="mailto:your.email@example.com" className="hero-button">
            your.email@example.com
          </a>
        </motion.section>
      </motion.main>
    </>
  );
} 