import { useState } from 'react';
import { Link } from 'react-router-dom';
import OsintDashboard from '../components/tools/OsintDashboard';
import ToolsHome from '../components/tools/ToolsHome';
import ThreatIntelSection from '../components/tools/ThreatIntelSection';
import GlobalThreatContext from '../components/tools/GlobalThreatContext';
import PhishingDetection from '../components/tools/PhishingDetection';

export default function Tools() {
  const [activeModule, setActiveModule] = useState('home');

  const modules = [
    { id: 'home', label: 'Dashboard Home' },
    { id: 'threat2025', label: 'Threat Landscape 2025' },
    { id: 'osint', label: 'OSINT Framework' },
    { id: 'phishing', label: 'Phishing Analysis' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          Cybersecurity Toolkit
        </div>

        <nav className="sidebar-nav-container">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`sidebar-nav-btn ${activeModule === mod.id ? 'active' : 'inactive'}`}
            >
              {mod.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer-link">
          <Link to="/portfolio" className="btn-nav btn-nav-back">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeModule === 'home' && <ToolsHome onNavigate={setActiveModule} />}
        {activeModule === 'osint' && <OsintDashboard />}
        {activeModule === 'threat2025' && <ThreatIntelSection />}
        {activeModule === 'globalThreatContext' && <GlobalThreatContext />}
        {activeModule === 'phishing' && <PhishingDetection />}
        
        {(activeModule !== 'home' && activeModule !== 'osint' && activeModule !== 'threat2025' && activeModule !== 'globalThreatContext' && activeModule !== 'phishing') && (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <h3 className="heading-card">Module Under Development</h3>
            <p className="empty-message">This tool is currently being built.</p>
          </div>
        )}
      </main>
    </div>
  );
}