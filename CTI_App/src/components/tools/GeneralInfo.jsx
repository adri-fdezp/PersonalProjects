import React from 'react';

export default function GeneralInfo({ onNavigate }) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="general-info-layout">
      
      {/* Hero / Welcome Banner */}
      <div className="info-banner">
        <div className="bg-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2>
          Operations Center
        </h2>
        <p className="meta">
          {currentDate} | SYSTEM_READY
        </p>
        <p className="desc">
          Welcome to the <span>CyberApp OSINT Framework</span>. 
          This centralized dashboard provides a curated suite of tools for digital reconnaissance, 
          threat intelligence gathering, and identity investigation.
        </p>
      </div>

      <div className="info-grid">
        {/* Quick Guide / Mission */}
        <div className="info-card">
          <h3>
            <span style={{color: '#06b6d4'}}>&gt;</span> Mission Objectives
          </h3>
          <ul className="mission-list">
            <li>
              <span className="bullet">●</span>
              <span><strong>Reconnaissance:</strong> Gather public data on IP addresses, domains, and networks.</span>
            </li>
            <li>
              <span className="bullet">●</span>
              <span><strong>Intelligence:</strong> Analyze potential threats using global databases and reputation checkers.</span>
            </li>
            <li>
              <span className="bullet">●</span>
              <span><strong>Investigation:</strong> Correlate digital identities across social platforms and public records.</span>
            </li>
          </ul>
        </div>

        {/* System Status / Highlights */}
        <div className="info-card">
           <h3>
            <span style={{color: '#4ade80'}}>&gt;</span> Operational Status
          </h3>
          <div className="status-grid">
            <div className="status-box green">
              <p className="label">API Connections</p>
              <p className="val green">Stable</p>
            </div>
            <div className="status-box cyan">
              <p className="label">Tools Indexed</p>
              <p className="val white">50+</p>
            </div>
            <div className="status-box yellow">
              <p className="label">Threat Level</p>
              <p className="val yellow">Elevated</p>
            </div>
            <div className="status-box purple">
              <p className="label">User Access</p>
              <p className="val white">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Shortcuts */}
      <div className="nav-shortcuts">
        <h3>
            <span style={{color: '#06b6d4', marginRight: '0.5rem'}}>::</span> Quick Navigation
        </h3>
        <div className="shortcuts-grid">
            <button onClick={() => onNavigate("globalThreatContext")} className="shortcut-btn">
                <span className="sub">View Global Stats</span>
                <span className="title">Threat Context</span>
            </button>
            <button onClick={() => onNavigate("osint")} className="shortcut-btn">
                <span className="sub">Start Investigation</span>
                <span className="title">OSINT Tools</span>
            </button>
             <button onClick={() => onNavigate("threat2025")} className="shortcut-btn">
                <span className="sub">Analyze IOCs</span>
                <span className="title">Threat Intel</span>
            </button>
             <button onClick={() => onNavigate("osint")} className="shortcut-btn">
                <span className="sub">Track Targets</span>
                <span className="title">Social Media</span>
            </button>
        </div>
      </div>


    </div>
  );
}