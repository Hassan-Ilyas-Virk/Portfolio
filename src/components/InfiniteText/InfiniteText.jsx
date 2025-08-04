'use client';
import React, { useEffect, useState } from 'react';

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

const InfiniteText = () => {
    const [parallax, setParallax] = useState(0);
    const [rowConfigs, setRowConfigs] = useState([]);

    // Generate row configurations after mount to avoid hydration mismatch
    useEffect(() => {
        const configs = Array.from({ length: 14 }, (_, i) => ({
            speed: getRandomInRange(40, 140),
            size: getRandomInRange(30, 40),
            opacity: (getRandomInRange(20, 40) / 100).toFixed(2),
            phrase: phrases[i % phrases.length]
        }));
        setRowConfigs(configs);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setParallax(-window.scrollY / 4.5);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="compacta-italic"
            suppressHydrationWarning={true}
            style={{
                position: 'fixed',
                top: '-20%',
                left: '-20%',
                width: '140%',
                height: '140%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 1,
                transform: `rotate(-15deg) translateY(${parallax}px)`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)'
            }}
        >
            {rowConfigs.length > 0 && rowConfigs.map((config, rowIndex) => (
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
                        opacity: config.opacity,
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

export default InfiniteText; 