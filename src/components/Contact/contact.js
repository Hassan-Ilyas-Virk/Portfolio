'use client';

import React, { useState, useRef } from 'react';
import './contact.css';

const MIN_SIZE = 8;
const MAX_SIZE = 300;

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Hassan-Ilyas-Virk',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>
    )
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/hassan-ilyas-virk',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><line x1="16" y1="11" x2="16" y2="16"/><line x1="8" y1="11" x2="8" y2="16"/><line x1="8" y1="8" x2="8" y2="8"/><line x1="12" y1="11" x2="12" y2="16"/></svg>
    )
  }
];

const email = 'hassanilyas.virk@gmail.com';
const phone = '+923035432101';
const resumeUrl = '/medias/Resume.pdf';

export default function Contact() {
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
    <section id="contact" className="contactSection" suppressHydrationWarning={true}>
      <div
        className="contactColumns"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'relative', overflow: 'hidden' }}
        suppressHydrationWarning={true}
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
        <div className="contactLeft">
          <h1 className="contactBigHeading">
            Want to <span className="contactItalic">start</span><br />a new<br />project?
          </h1>
          <div className="contactSubtext">Or just say hello.</div>
        </div>
        <div className="contactRight">
          <a href={`mailto:${email}`} className="contactEmailBig">{email}</a>
          <div className="socialLinks contactSocialsList">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="socialLink"
                aria-label={social.name}
              >
                <span className="socialIcon">{social.icon}</span> {social.name}
              </a>
            ))}
          </div>
          <div className="contactPhone">
            <span className="phoneIcon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.09 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/></svg>
            </span>
            <span className="phoneText">{phone}</span>
          </div>
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="resumeButton">
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
