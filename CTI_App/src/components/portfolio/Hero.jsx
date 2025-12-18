import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../../data/portfolioData';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = portfolioData.personal.titles;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section id="hero" className="hero-section">
      {/* Gradient Overlay */}
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="heading-hero">
          Hi, I'm <span className="text-highlight">{portfolioData.personal.shortName}</span>
        </h1>
        <div className="typing-container"> 
            <p>
            {text}<span className="cursor">|</span>
            </p>
        </div>
        
        <div className="hero-actions">
            {/* New Button for Cyber Tool */}
            <Link to="/" className="btn-primary btn-hero-cyber-tool">
                &gt; Launch_Cyber_Toolkit
            </Link>

            {/* Fixed Scroll Links */}
            <a href="#about" className="btn-primary">
                &gt; About_Me
            </a>
            <a href="#projects" className="btn-primary">
                &gt; Projects
            </a>
            <a href="#contact" className="btn-primary">
                &gt; Contact
            </a>
        </div>
      </div>
    </section>
  )
}