'use client';
import React, { useState, useRef } from 'react';
import './projects.css';

const projects = [
  {
    title: '3D Distorted Glass Effect',
    description: 'A visually stunning 3D glass distortion effect using Three.js and React Three Fiber.',
    link: 'https://github.com/yourusername/3d-distorted-glass-effect',
    technologies: ['Three.js', 'React Three Fiber', 'React', 'CSS']
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, interactive portfolio to showcase my work and skills as a developer and designer.',
    link: 'https://yourportfolio.com/',
    technologies: ['Next.js', 'React', 'CSS Modules', 'Vercel']
  },
  {
    title: 'Realtime Chat App',
    description: 'A full-stack chat application with WebSocket support for real-time messaging.',
    link: 'https://github.com/yourusername/realtime-chat-app',
    technologies: ['Node.js', 'Express', 'Socket.io', 'React', 'MongoDB']
  },
  // Add more projects as needed
];

const MIN_SIZE = 8;
const MAX_SIZE = 300;

export default function Projects() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hovering: false, size: MIN_SIZE });
  const prev = useRef({ x: 0, y: 0, t: 0 });

  const handleMouseMove = (e) => {
    const content = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - content.left;
    const y = e.clientY - content.top;
    const now = performance.now();
    const { x: px, y: py, t: pt } = prev.current;
    let speed = 0;
    if (pt) {
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      const dt = now - pt;
      speed = dt > 0 ? dist / dt : 0;
    }
    // Map speed to size
    let size = MIN_SIZE + Math.min(speed * 600, MAX_SIZE - MIN_SIZE);
    size = Math.max(MIN_SIZE, Math.min(size, MAX_SIZE));
    prev.current = { x, y, t: now };
    setCursor({ x, y, hovering: true, size });
  };

  const handleMouseLeave = () => {
    setCursor((c) => ({ ...c, hovering: false }));
    prev.current = { x: 0, y: 0, t: 0 };
  };

  return (
    <section id="projects" className="projectsSection">
      <div
        className="sectionContent"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="purpleCursor"
          style={{
            left: cursor.x,
            top: cursor.y,
            opacity: cursor.hovering ? 1 : 0,
            width: cursor.size,
            height: cursor.size
          }}
        />
        <h1>Projects</h1>
        <div className="projectsGrid">
          {projects.map((project, idx) => (
            <div className="projectCard" key={idx}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="techList">
                {project.technologies.map((tech, tIdx) => (
                  <span className="techBadge" key={tIdx}>{tech}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="projectLink">
                Visit Project{' '}
                <span aria-label="External Link" style={{ verticalAlign: 'middle', display: 'inline-block', marginLeft: 6 }}>
                  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'inline',verticalAlign:'middle'}}>
                    <path d="M7 13L13 7M13 7H8M13 7V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 