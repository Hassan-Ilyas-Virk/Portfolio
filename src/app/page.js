'use client';

import dynamic from 'next/dynamic'
import { useEffect, useRef, useCallback, useState } from 'react'
import VariableProximity from '@/components/VariableProximity/VariableProximity'

const Scene = dynamic(() => import('@/components/Scene/Index'), { ssr: false })

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  { label: 'FRONTEND', n: 1, items: ['React / Next.js', 'TypeScript', 'Three.js / R3F', 'WebGL · GLSL', 'GSAP · Framer'] },
  { label: 'CREATIVE', n: 2, items: ['Shaders', 'Blender', 'ZBrush', 'Figma', 'Motion design'] },
  { label: 'BACKEND', n: 3, items: ['Node.js', 'MongoDB', 'Express', 'Spring Boot', 'REST APIs'] },
  { label: 'CRAFT', n: 4, items: ['C++ / C#', 'Java / Kotlin', 'Python', 'Docker', 'Git / GitHub'] },
];

const timeline = [
  { year: '2024 — NOW', role: 'Creative Developer', org: 'FREELANCE', note: 'Building immersive 3D sites, WebGL campaigns and interactive product stories for agencies and founders.' },
  { year: '2024', role: '3D Modeler', org: 'PHANTOM 3D STUDIO', note: 'Creating high-fidelity 3D models, texturing in Substance Painter, and delivering production-ready game assets.' },
  { year: '2023 — 24', role: 'Game Asset Designer', org: 'ANNIXIA STUDIOS', note: 'Designed stylized airship assets and environment pieces for game projects using Blender and Unity.' },
  { year: '2022', role: 'Started the journey', org: 'SELF-TAUGHT', note: 'First lines of JavaScript, first 3D render, first "how did they do that?" rabbit hole.' },
];

const experiments = [
  { n: 2, tag: 'DEEP LEARNING · CV', title: 'Facial Expression Detector', desc: 'Real-time facial expression recognition using TensorFlow and OpenCV.', link: 'https://github.com/Hassan-Ilyas-Virk/facial-expression-dectector' },
  { n: 3, tag: 'MERN · FULLSTACK', title: 'Marketplace App', desc: 'Full-stack e-commerce app with user auth and product listings.', link: 'https://github.com/Hassan-Ilyas-Virk/marketplace-MERN' },
  { n: 4, tag: '3D · BLENDER', title: 'Kaneki vs Jason', desc: 'Cinematic 3D render of an iconic Tokyo Ghoul scene.', link: 'https://hassan_ilyas.artstation.com/projects/98ZNkL' },
];

const socials = [
  { label: 'GITHUB', href: 'https://github.com/Hassan-Ilyas-Virk' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/hassan-ilyas-virk' },
  { label: 'ARTSTATION', href: 'https://hassan_ilyas.artstation.com' },
];

export default function Page() {
  const progressRef = useRef(null);
  const heroRef = useRef(null);
  const [mat, setMat] = useState({
    thickness: 1.2,
    roughness: 0.05,
    ior: 1.5,
    chromaticAberration: 2.0,
    envMapIntensity: 3,
    samples: 6,
  });
  const [model, setModel] = useState({ scale: 3.05, posX: 0.0338, posY: 0 });
  const [panelOpen, setPanelOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const setM = (key, val) => setMat(p => ({ ...p, [key]: val }));
  const setMo = (key, val) => setModel(p => ({ ...p, [key]: val }));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const p = Math.min(window.scrollY / max, 1);
      if (progressRef.current) progressRef.current.style.width = (p * 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Overlays */}
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div ref={progressRef} className="progress-bar" aria-hidden="true" />

      {/* Glass settings panel — remove when done */}
      <div style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 99999,
        background: 'rgba(0,0,0,.9)', border: '1px solid rgba(255,255,255,.15)',
        borderRadius: 12, padding: panelOpen ? '14px 18px' : '8px 14px',
        fontFamily: 'monospace', fontSize: 11, color: '#fff',
        minWidth: panelOpen ? 280 : 'auto', userSelect: 'none',
      }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 16 }}
          onClick={() => setPanelOpen(!panelOpen)}
        >
          <span style={{ fontWeight: 700, letterSpacing: '.08em' }}>3D CONTROLS</span>
          <span>{panelOpen ? '▾' : '▸'}</span>
        </div>
        {panelOpen && (
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', color: '#aaa', marginBottom: 2 }}>MODEL</div>
            {[
              { label: 'Scale', key: 'scale', min: 0.2, max: 8, step: 0.05 },
              { label: 'Pos X', key: 'posX', min: -5, max: 5, step: 0.0001, decimals: 4 },
              { label: 'Pos Y', key: 'posY', min: -5, max: 5, step: 0.0001, decimals: 4 },
            ].map(s => (
              <label key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <span style={{ minWidth: 100 }}>{s.label}: {model[s.key].toFixed(s.decimals ?? 2)}</span>
                <input
                  type="range" min={s.min} max={s.max} step={s.step} value={model[s.key]}
                  onChange={e => setMo(s.key, +e.target.value)}
                  style={{ width: 120, cursor: 'pointer' }}
                />
              </label>
            ))}
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', color: '#aaa', margin: '6px 0 2px' }}>GLASS</div>
            {[
              { label: 'Thickness', key: 'thickness', min: 0, max: 5, step: 0.05 },
              { label: 'Roughness', key: 'roughness', min: 0, max: 1, step: 0.01 },
              { label: 'IOR', key: 'ior', min: 1, max: 5, step: 0.05 },
              { label: 'Chrom Aberr', key: 'chromaticAberration', min: 0, max: 5, step: 0.05 },
              { label: 'Env Intensity', key: 'envMapIntensity', min: 0, max: 10, step: 0.1 },
              { label: 'Samples', key: 'samples', min: 1, max: 16, step: 1, decimals: 0 },
            ].map(s => (
              <label key={s.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <span style={{ minWidth: 100 }}>{s.label}: {mat[s.key].toFixed(s.decimals ?? 2)}</span>
                <input
                  type="range" min={s.min} max={s.max} step={s.step} value={mat[s.key]}
                  onChange={e => setM(s.key, +e.target.value)}
                  style={{ width: 120, cursor: 'pointer' }}
                />
              </label>
            ))}
            <div style={{ marginTop: 4, fontSize: 9, color: '#888', lineHeight: 1.4 }}>
              All update live. Tell me the values you like.
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="nav">
        <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/medias/logo_png.png" alt="Logo" style={{ width: 30, height: 30, objectFit: 'contain' }} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
            <span className="nav-logo-name">HASSAN ILYAS</span>
            <span className="nav-logo-sub">CREATIVE DEVELOPER</span>
          </span>
        </a>
        <div className="nav-links">
          {navLinks.map(l => (
            <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>{l.label}</a>
          ))}
        </div>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? '☀' : '●'} {dark ? 'LIGHT' : 'DARK'}
        </button>
      </nav>

      {/* Hero */}
      <header id="top" className="hero">
        <div className="hero-marquee" aria-hidden="true">
          <div className="hero-marquee-line" style={{ top: '13%', animation: 'mqL 42s linear infinite' }}>
            CREATIVE DEVELOPER&nbsp;·&nbsp;CREATIVE DEVELOPER&nbsp;·&nbsp;CREATIVE DEVELOPER&nbsp;·&nbsp;CREATIVE DEVELOPER&nbsp;·&nbsp;CREATIVE DEVELOPER&nbsp;·&nbsp;CREATIVE DEVELOPER&nbsp;·&nbsp;
          </div>
          <div className="hero-marquee-line" style={{ top: '46%', animation: 'mqR 52s linear infinite' }}>
            THREE.JS&nbsp;/&nbsp;WEBGL&nbsp;/&nbsp;GLSL&nbsp;·&nbsp;THREE.JS&nbsp;/&nbsp;WEBGL&nbsp;/&nbsp;GLSL&nbsp;·&nbsp;THREE.JS&nbsp;/&nbsp;WEBGL&nbsp;/&nbsp;GLSL&nbsp;·&nbsp;THREE.JS&nbsp;/&nbsp;WEBGL&nbsp;/&nbsp;GLSL&nbsp;·&nbsp;
          </div>
          <div className="hero-marquee-line" style={{ top: '78%', animation: 'mqL 60s linear infinite' }}>
            INTERACTIVE&nbsp;·&nbsp;IMMERSIVE&nbsp;·&nbsp;EXPRESSIVE&nbsp;·&nbsp;INTERACTIVE&nbsp;·&nbsp;IMMERSIVE&nbsp;·&nbsp;EXPRESSIVE&nbsp;·&nbsp;INTERACTIVE&nbsp;·&nbsp;IMMERSIVE&nbsp;·&nbsp;EXPRESSIVE&nbsp;·&nbsp;
          </div>
        </div>

        {/* 3D Scene */}
        <div className="hero-3d">
          <Scene matProps={mat} modelProps={model} />
        </div>

        <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
          <div className="mono-sm" style={{ color: 'var(--mute)' }}>
            PORTFOLIO — VOL.01<br /><span style={{ color: 'var(--ink)' }}>[ DRAG THE OBJECT ]</span>
          </div>
          <div className="mono-sm" style={{ textAlign: 'right', color: 'var(--mute)' }}>
            INTERACTIVE 3D / WEBGL<br />EST. 2026 — ✶
          </div>
        </div>

        <div ref={heroRef} style={{ position: 'relative' }}>
          <div className="hero-creative">creative</div>
          <div className="hero-title">
            <VariableProximity
              label="HASSAN"
              className="hero-proximity"
              fromFontVariationSettings="'wght' 900"
              toFontVariationSettings="'wght' 400"
              containerRef={heroRef}
              radius={150}
              falloff="gaussian"
            />
          </div>
          <div className="hero-title-outline">
            <VariableProximity
              label="ILYAS"
              className="hero-proximity-outline"
              fromFontVariationSettings="'wght' 900"
              toFontVariationSettings="'wght' 400"
              containerRef={heroRef}
              radius={150}
              falloff="gaussian"
            />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 430 }}>
            <div className="mono-label" style={{ marginBottom: 9, letterSpacing: '.2em' }}>CREATIVE DEVELOPER · 3D ON THE WEB</div>
            <div style={{ fontSize: 'clamp(15px,1.4vw,19px)', fontWeight: 500, lineHeight: 1.45, maxWidth: '40ch' }}>
              I design and engineer immersive, expressive web experiences — where interaction, motion and real-time 3D do the talking.
            </div>
          </div>
          <div className="hero-scroll" onClick={() => scrollTo('about')}>
            SCROLL <span style={{ display: 'inline-block', animation: 'hintMove 1.6s ease-in-out infinite' }}>↓</span>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="section">
        <div className="section-header reveal">
          <span className="accent-label">(01)</span>
          <h2 className="section-title">ABOUT</h2>
          <span className="section-sub">WHO / WHERE / WHAT NOW</span>
        </div>
        <div className="bento">
          <div className="card card-6 card-tall reveal" style={{ transitionDelay: '.1s' }}>
            <div className="mono-label">// PROFILE</div>
            <div>
              <div style={{ fontSize: 'clamp(22px,2.6vw,36px)', fontWeight: 800, lineHeight: 1.12, letterSpacing: '-.01em', marginBottom: 14, textWrap: 'balance' }}>
                Hi — I&apos;m Hassan, a creative developer who builds the kind of web that makes people lean in.
              </div>
              <div style={{ fontSize: 'clamp(14px,1.2vw,16px)', lineHeight: 1.55, opacity: .78, maxWidth: '52ch' }}>
                Turning ideas into tactile, real-time experiences. I live in the seam between design and engineering: shaders, motion, 3D, and the obsessive details that make an interface feel alive.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['THREE.JS', 'GLSL', 'REACT', 'BLENDER'].map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>

          <div className="card card-3 reveal" style={{ minHeight: 142, transitionDelay: '.2s' }}>
            <div className="mono-label">STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="status-dot" />
              <span style={{ fontSize: 'clamp(17px,1.8vw,23px)', fontWeight: 800 }}>Available</span>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.4, opacity: .74 }}>Open to freelance &amp; collaborations for 2026.</div>
          </div>

          <div className="card card-3 reveal" style={{ minHeight: 142, transitionDelay: '.3s' }}>
            <div className="mono-label">CURRENTLY</div>
            <div style={{ fontSize: 'clamp(15px,1.5vw,19px)', fontWeight: 700, lineHeight: 1.2 }}>
              Shipping WebGPU experiments &amp; a shader playground.
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '.12em', color: 'var(--accent)' }}>● LEARNING IN PUBLIC</div>
          </div>

          <div className="card card-3 reveal" style={{ minHeight: 142, transitionDelay: '.4s' }}>
            <div className="mono-label">LOCATION</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 'clamp(20px,2vw,28px)', fontWeight: 700, letterSpacing: '.02em' }}>
              LAHORE, PK
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.12em' }}>GMT+5</div>
          </div>

          <div className="card card-3 reveal" style={{ minHeight: 142, flexDirection: 'row', justifyContent: 'space-between', transitionDelay: '.5s' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span className="mono-label">YEARS</span>
              <span style={{ fontFamily: "'Archivo Black'", fontSize: 'clamp(34px,3.6vw,56px)', lineHeight: .9 }}>05+</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'right' }}>
              <span className="mono-label">SHIPPED</span>
              <span style={{ fontFamily: "'Archivo Black'", fontSize: 'clamp(34px,3.6vw,56px)', lineHeight: .9 }}>40+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="section-header reveal">
          <span className="accent-label">(02)</span>
          <h2 className="section-title">SKILLS</h2>
          <span className="section-sub">THE TOOLKIT</span>
        </div>
        <div className="bento">
          {skills.map((grp, i) => (
            <div key={grp.label} className="skill-card reveal-scale" style={{ transitionDelay: `${i * 0.1 + 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontFamily: "'Archivo Black'", fontSize: 'clamp(18px,1.8vw,24px)' }}>{grp.label}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--mute)' }}>0{grp.n}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {grp.items.map(t => (
                  <div key={t} className="skill-item">
                    <span className="skill-dot" />{t}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="marquee-bar reveal" aria-hidden="true" style={{ transitionDelay: '.5s' }}>
          <div className="marquee-text">
            SHADERS&nbsp;✶&nbsp;INTERACTION DESIGN&nbsp;✶&nbsp;REAL-TIME 3D&nbsp;✶&nbsp;MICRO-ANIMATION&nbsp;✶&nbsp;PERFORMANCE&nbsp;✶&nbsp;CREATIVE CODING&nbsp;✶&nbsp;SHADERS&nbsp;✶&nbsp;INTERACTION DESIGN&nbsp;✶&nbsp;REAL-TIME 3D&nbsp;✶&nbsp;MICRO-ANIMATION&nbsp;✶&nbsp;PERFORMANCE&nbsp;✶&nbsp;CREATIVE CODING&nbsp;✶&nbsp;
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <div className="section-header reveal">
          <span className="accent-label">(03)</span>
          <h2 className="section-title">JOURNEY</h2>
          <span className="section-sub">SELECTED EXPERIENCE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {timeline.map((job, i) => (
            <div key={job.year} className="tl-row reveal-left" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="tl-year">{job.year}</div>
              <div>
                <div className="tl-role">{job.role}</div>
                <div className="tl-note">{job.note}</div>
              </div>
              <div className="tl-org">{job.org}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </section>

      {/* Projects / Playground */}
      <section id="playground" className="section">
        <div className="section-header reveal">
          <span className="accent-label">(04)</span>
          <h2 className="section-title" style={{ background: 'var(--irid)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 6s linear infinite' }}>
            PROJECTS
          </h2>
          <span className="section-sub">EXPERIMENTS &amp; WORK</span>
        </div>
        <div className="playground-grid">
          {experiments.map((ex, i) => (
            <a key={ex.n} href={ex.link} target="_blank" rel="noopener noreferrer" className="playground-card reveal-scale" style={{ transitionDelay: `${i * 0.12 + 0.1}s` }}>
              <div className="playground-hero">
                <div className="playground-hero-overlay" />
                <div className="playground-num">0{ex.n}</div>
              </div>
              <div className="playground-body">
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)', marginBottom: 7 }}>{ex.tag}</div>
                <div style={{ fontFamily: "'Archivo Black'", fontSize: 'clamp(20px,2vw,28px)', marginBottom: 6 }}>{ex.title}</div>
                <div style={{ fontSize: 14, opacity: .72, lineHeight: 1.5 }}>{ex.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="footer">
        <div className="reveal" style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, letterSpacing: '.2em', color: 'var(--accent)', marginBottom: 20 }}>(05) — LET&apos;S TALK</div>
        <h2 className="footer-heading reveal" style={{ transitionDelay: '.1s' }}>
          LET&apos;S BUILD<br />SOMETHING <span className="footer-irid">GOOD.</span>
        </h2>
        <div className="footer-grid reveal" style={{ transitionDelay: '.2s' }}>
          <div>
            <div className="mono-label" style={{ color: '#8a8a86', marginBottom: 14 }}>DROP A LINE</div>
            <a href="mailto:hassanilyas.virk@gmail.com" className="footer-email">
              hassanilyas.virk@gmail.com <span style={{ fontSize: '.6em' }}>↗</span>
            </a>
          </div>
          <div className="social-grid">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>{s.label}</span><span style={{ color: '#8a8a86' }}>↗</span>
              </a>
            ))}
            <a href="/medias/Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-link">
              <span>RESUME</span><span style={{ color: '#8a8a86' }}>↓</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 HASSAN ILYAS — ALL RIGHTS RESERVED</span>
          <span>BUILT WITH THREE.JS &amp; TOO MUCH COFFEE</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ color: '#f3f3f1', display: 'flex', alignItems: 'center', gap: 8 }}>
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
