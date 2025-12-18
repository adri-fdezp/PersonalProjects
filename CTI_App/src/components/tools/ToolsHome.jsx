import React from 'react';

export default function ToolsHome({ onNavigate }) {
  return (
    <div className="home-container">
      
      {/* Welcome Banner - Compact */}
      <div className="welcome-banner">
        <div className="banner-glow"></div>
        <h1 className="heading-hero">
          My Cybersecurity <span className="text-cyan-400">Toolkit</span>
        </h1>
        <p className="banner-text welcome-banner-text">
          A centralized workspace for security professionals. Access advanced reconnaissance tools, 
          threat intelligence analysis, and operational dashboards.
        </p>
      </div>

       {/* Project Scope & Capabilities - Compact */}
       <div className="info-card home-scope">
          <h3>
            <span style={{color: '#06b6d4'}}>&gt;</span> Project Scope & Capabilities
          </h3>
          <ul className="mission-list">
            <li>
              <span className="bullet">●</span>
              <span><strong>Centralized Intelligence Gathering:</strong> Unified interface for querying multiple OSINT sources.</span>
            </li>
            <li>
              <span className="bullet">●</span>
              <span><strong>Real-Time Threat Visualization:</strong> Interactive data visualization of CISA's KEV catalog.</span>
            </li>
            <li>
              <span className="bullet">●</span>
              <span><strong>Structured Analytical Workflows:</strong> Integrated playbooks for phishing analysis & domain investigation.</span>
            </li>
          </ul>
      </div>

      {/* Tools Grid - Compact & Scrollable only if needed */}
      <div className="home-tools-grid">
        
        {/* Module 1: OSINT Framework */}
        <div 
          onClick={() => onNavigate('osint')}
          className="card-tool home-card-tool"
        >
          <div className="icon-bg home-card-tool-icon-bg">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon home-card-tool-main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="heading-card home-card-tool-title">OSINT Framework</h3>
            <p className="text-muted line-clamp-2 home-card-tool-description">
              Comprehensive suite for Open Source Intelligence gathering.
            </p>
          </div>
        </div>
        
         {/* Module 3: Threat Landscape 2025 */}
         <div 
          onClick={() => onNavigate('threat2025')}
          className="card-tool hover-purple home-card-tool"
        >
          <div className="icon-bg home-card-tool-icon-bg">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
             </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon home-card-tool-main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="heading-card home-card-tool-title">Threat Landscape 2025</h3>
            <p className="text-muted line-clamp-2 home-card-tool-description">
               Real-time visualization of the 2025 threat landscape using CISA data.
            </p>
          </div>
        </div>

        {/* Module 4: Phishing Analysis */}
        <div 
          onClick={() => onNavigate('phishing')}
          className="card-tool home-card-tool"
        >
          <div className="icon-bg home-card-tool-icon-bg">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon home-card-tool-main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="heading-card home-card-tool-title">Phishing Analysis</h3>
            <p className="text-muted line-clamp-2 home-card-tool-description">
              Analyst guide for detecting social engineering & IOC extraction.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}