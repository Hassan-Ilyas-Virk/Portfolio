'use client';
import React, { useState, useRef } from 'react';
import './projects.css';

const projects = [
  {
    title: 'Facial Expression Detector',
    description: 'Real-time facial expression recognition using deep learning and computer vision.',
    link: 'https://github.com/Hassan-Ilyas-Virk/facial-expression-dectector',
    technologies: ['Python', 'TensorFlow', 'OpenCV']
  },
  {
    title: 'Marketplace MERN',
    description: 'A full-stack e-commerce app with user authentication and product listings.',
    link: 'https://github.com/Hassan-Ilyas-Virk/marketplace-MERN',
    technologies: ['MongoDB', 'React', 'Node.js']
  },
  {
    title: 'Weather App',
    description: 'Weather dashboard with charts, tables, and chatbot integration.',
    link: 'https://github.com/Hassan-Ilyas-Virk/Weather-App',
    technologies: ['JavaScript', 'Chart.js', 'Gemini Chatbot']
  },
  {
    title: 'Stylized Airships Game Assets',
    description: "Stylized airship assets for Annxia Studio's game project.",
    link: 'https://hassan_ilyas.artstation.com/projects/WXVl5v',
    technologies: ['Blender', 'Game Asset Design' ,'Unity' ]
  },
  {
    title: 'Kaneki vs Jason 3D Render',
    description: 'Cinematic 3D render of Kaneki vs Jason from Tokyo Ghoul.',
    link: 'https://hassan_ilyas.artstation.com/projects/98ZNkL',
    technologies: ['Blender', 'ZBrush', 'After Effects']
  },
 
  
  // Add more projects as needed
];

const MIN_SIZE = 8;
const MAX_SIZE = 300;

// Utility to generate a dark color from a string
function stringToDarkColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsla(${h}, 60%, 18%, 0.1)`;
}

// Utility to generate a bright font color from a string (same hue, high lightness)
function stringToBrightColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 40%, 70%)`;
}

// Utility to generate a glow color for box-shadow
function stringToGlow(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `0 0 12px 2px hsla(${h}, 70%, 50%, 0.2)`;
}

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
                  <span
                    className="techBadge"
                    key={tIdx}
                    style={{
                      background: stringToDarkColor(tech),
                      color: stringToBrightColor(tech),
                      boxShadow: stringToGlow(tech)
                    }}
                  >
                    {tech}
                  </span>
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