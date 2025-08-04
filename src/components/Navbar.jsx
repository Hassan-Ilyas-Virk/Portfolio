"use client";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.main-navbar')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
      
      // Enter or Space to toggle menu when button is focused
      if ((event.key === 'Enter' || event.key === ' ') && 
          event.target.classList.contains('hamburger-btn')) {
        event.preventDefault();
        setMenuOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <nav className={`main-navbar ${menuOpen ? 'menu-is-open' : 'menu-is-closed'}`}>
      <button
        className="hamburger-btn"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navbar-list"
        aria-haspopup="true"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenuOpen((open) => !open);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setMenuOpen((open) => !open);
          }
        }}
        type="button"
      >
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
      </button>
      <ul 
        id="main-navbar-list" 
        className={menuOpen ? 'open' : ''}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <li role="none">
          <a 
            href="#home" 
            role="menuitem"
            onClick={(e) => {
              setMenuOpen(false);
              // Smooth scroll to top
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Home
          </a>
        </li>
        <li role="none">
          <a 
            href="#about" 
            role="menuitem"
            onClick={(e) => {
              setMenuOpen(false);
              // Smooth scroll to section
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About
          </a>
        </li>
        <li role="none">
          <a 
            href="#projects" 
            role="menuitem"
            onClick={(e) => {
              setMenuOpen(false);
              // Smooth scroll to section
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Projects
          </a>
        </li>
        <li role="none">
          <a 
            href="#contact" 
            role="menuitem"
            onClick={(e) => {
              setMenuOpen(false);
              // Smooth scroll to section
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
} 