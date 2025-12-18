import React from 'react';

export default function ToolsHome({ onNavigate }) {
  return (
    <div className="home-container">
      
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-glow"></div>
        <h1 className="heading-hero">
          My Cybersecurity <span className="text-cyan-400">Toolkit</span>
        </h1>
        <p className="banner-text">
          A centralized workspace for security professionals. Access advanced reconnaissance tools, 
          threat intelligence analysis, and operational dashboards from a single command center.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="home-tools-grid">
        
        {/* Module 1: OSINT Framework */}
        <div 
          onClick={() => onNavigate('osint')}
          className="card-tool"
        >
          <div className="icon-bg">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="heading-card">OSINT Framework</h3>
            <p className="text-muted mb-4 line-clamp-2">
              Comprehensive suite for Open Source Intelligence gathering. Includes search dorks, people search, and domain recon.
            </p>
          </div>
        </div>
        
         {/* Module 3: Threat Landscape 2025 */}
         <div 
          onClick={() => onNavigate('threat2025')}
          className="card-tool hover-purple"
        >
          <div className="icon-bg">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
             </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="heading-card">Threat Landscape 2025</h3>
            <p className="text-muted mb-4 line-clamp-2">
               Real-time visualization of the 2025 threat landscape using CISA data. Top vendors, exploit timelines, and critical vulnerabilities.
            </p>
          </div>
        </div>

        {/* Module 4: Phishing Analysis */}
        <div 
          onClick={() => onNavigate('phishing')}
          className="card-tool"
        >
          <div className="icon-bg">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="relative z-10">
            <div className="main-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="heading-card">Phishing Analysis</h3>
            <p className="text-muted mb-4 line-clamp-2">
              Analyst guide for detecting social engineering. Learn header analysis, IOC extraction, and defensive workflows.
            </p>
          </div>
        </div>

      </div>

      {/* System Status Footer */}
      <div className="status-footer">
        <div className="status-item">
            <p className="label">System Version</p>
            <p className="value text-white">v2.4.0-alpha</p>
        </div>
        <div className="status-item">
            <p className="label">Last Update</p>
            <p className="value text-white">2025-12-07</p>
        </div>
        <div className="status-item">
            <p className="label">Security Level</p>
            <p className="value text-green">SECURE</p>
        </div>
         <div className="status-item">
            <p className="label">Active Modules</p>
            <p className="value text-cyan">2 / 3</p>
        </div>
      </div>

    </div>
  );
}