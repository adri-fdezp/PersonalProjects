import React, { useState } from 'react';
import ThreatContextReport from './ThreatContextReport';
import ThreatCharts from './ThreatCharts';

export default function ThreatIntelSection() {
  const [activeView, setActiveView] = useState('context'); // 'context' or 'charts'

  return (
    <div className="tool-view-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* HEADER SECTION */}
      <div className="tool-header" style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #334155' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>Threat Landscape 2025</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Strategic intelligence and real-time operational metrics for the current year.
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="tool-tabs" style={{ display: 'flex', borderBottom: '1px solid #334155', marginBottom: '1.5rem' }}>
        <button
            onClick={() => setActiveView("context")}
            className={`tab-item ${activeView === "context" ? 'active' : ''}`}
            style={{ 
                padding: '0.75rem 1.25rem', 
                fontSize: '1rem', 
                fontWeight: '600', 
                border: 'none', 
                background: 'transparent', 
                color: activeView === "context" ? '#38bdf8' : '#94a3b8', 
                borderBottom: activeView === "context" ? '2px solid #38bdf8' : '2px solid transparent',
                cursor: 'pointer', 
                transition: 'all 0.2s ease',
                marginRight: '1rem',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                '&:hover': {
                    color: '#f8fafc'
                }
            }}
        >
            Strategic Context (Report)
        </button>
        <button
            onClick={() => setActiveView("charts")}
            className={`tab-item ${activeView === "charts" ? 'active' : ''}`}
            style={{ 
                padding: '0.75rem 1.25rem', 
                fontSize: '1rem', 
                fontWeight: '600', 
                border: 'none', 
                background: 'transparent', 
                color: activeView === "charts" ? '#38bdf8' : '#94a3b8', 
                borderBottom: activeView === "charts" ? '2px solid #38bdf8' : '2px solid transparent',
                cursor: 'pointer', 
                transition: 'all 0.2s ease',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                '&:hover': {
                    color: '#f8fafc'
                }
            }}
        >
            Live Metrics (Charts & Map)
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 min-h-0" style={{ overflowY: 'auto' }}>
        {activeView === 'context' ? <ThreatContextReport /> : <ThreatCharts />}
      </div>
    </div>
  );
}