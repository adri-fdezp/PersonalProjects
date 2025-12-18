import React, { useState } from 'react';

// --- Header Analyzer Component ---
function HeaderAnalyzer() {
  const [headerText, setHeaderText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeHeaders = () => {
    if (!headerText) return;

    // Simple regex extraction logic (Mock Simulation)
    const returnPathMatch = headerText.match(/Return-Path:\s*<(.+?)>/i);
    const fromMatch = headerText.match(/From:\s*.*<(.+?)>/i) || headerText.match(/From:\s*(.+)/i);
    const spfMatch = headerText.match(/Received-SPF:\s*(\w+)/i);
    const dkimMatch = headerText.match(/DKIM-Signature:/i);
    const ipMatch = headerText.match(/X-Originating-IP:\s*\[(.+?)\]/i) || headerText.match(/Received:\s*from.*\[(.+?)\]/i);

    const returnPath = returnPathMatch ? returnPathMatch[1] : 'Not Found';
    const from = fromMatch ? fromMatch[1] : 'Not Found';
    const spf = spfMatch ? spfMatch[1] : 'Not Found';
    const dkim = dkimMatch ? 'Present' : 'Not Found';
    const ip = ipMatch ? ipMatch[1] : 'Not Found';

    // Risk Logic
    let riskScore = 0;
    const flags = [];

    if (returnPath !== 'Not Found' && from !== 'Not Found' && returnPath !== from) {
      riskScore += 2;
      flags.push("Mismatch: Return-Path does not match 'From' address (Possible Spoofing)");
    }
    if (spf.toLowerCase() === 'fail' || spf.toLowerCase() === 'softfail') {
      riskScore += 3;
      flags.push("SPF Check Failed: Sender not authorized for this domain");
    }
    if (dkim === 'Not Found') {
      riskScore += 1;
      flags.push("No DKIM Signature found (Weak Authentication)");
    }

    setAnalysis({
      returnPath,
      from,
      spf,
      dkim,
      ip,
      riskScore,
      flags
    });
  };

  const loadSample = () => {
    const sample = `Return-Path: <bounce-mc.us19_44839@insecure-mail-server.com>
Received: from mail-server.com ([192.168.1.55])
Received-SPF: fail (google.com: domain of bounce-mc.us19_44839@insecure-mail-server.com does not designate 192.168.1.55 as permitted sender)
From: "CEO Office" <ceo@target-company.com>
Subject: URGENT: Wire Transfer Request
X-Originating-IP: [10.5.22.11]`;
    setHeaderText(sample);
  };

  return (
    <div className="analyzer-panel">
      <div className="panel-header">
        <label>Paste Raw Email Headers:</label>
        <button onClick={loadSample} className="load-sample-btn">Load Malicious Sample</button>
      </div>
      <textarea 
        value={headerText}
        onChange={(e) => setHeaderText(e.target.value)}
        placeholder={`Return-Path: <...>\nReceived: from ...\n...`}
      />
      <button onClick={analyzeHeaders} className="analyze-btn">
        Analyze Headers
      </button>

      {analysis && (
        <div className="analysis-result" style={{ marginTop: '1.5rem' }}>
          <div className="result-header">
            <h4>Analysis Report</h4>
            <span className={`risk-badge ${analysis.riskScore > 2 ? 'high' : analysis.riskScore > 0 ? 'medium' : 'low'}`}>
              Risk Level: {analysis.riskScore > 2 ? 'HIGH' : analysis.riskScore > 0 ? 'MEDIUM' : 'LOW'}
            </span>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="label">Return-Path</span>
              <code className="value">{analysis.returnPath}</code>
            </div>
            <div>
              <span className="label">From Address</span>
              <code className="value white">{analysis.from}</code>
            </div>
            <div>
              <span className="label">SPF Status</span>
              <span className={`value ${analysis.spf.toLowerCase().includes('fail') ? 'red' : 'green'}`}>{analysis.spf}</span>
            </div>
            <div>
              <span className="label">Originating IP</span>
              <code className="value plain">{analysis.ip}</code>
            </div>
          </div>
          
          {analysis.flags.length > 0 && (
            <div className="flags-container">
              <h5>Detected Red Flags</h5>
              <ul>
                {analysis.flags.map((flag, i) => (
                  <li key={i}>
                    <span className="icon">⚠️</span> {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SECTIONS = [
  {
    id: 'simulator',
    title: 'Header Simulator',
    icon: '⚡',
    content: (
      <div className="content-section">
        <p className="intro-text">
          Practice identifying spoofing and authentication failures using this interactive header parser. Paste a raw email header to extract key indicators.
        </p>
        <HeaderAnalyzer />
      </div>
    )
  },
  {
    id: 'tools',
    title: 'Analyst Tools Locker',
    icon: '🧰',
    content: (
      <div className="content-section">
        <p className="intro-text">
          Essential external utilities for verifying IOCs (Indicators of Compromise) safely.
        </p>
        <div className="tools-grid">
          <a href="https://mxtoolbox.com/EmailHeaders.aspx" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>MxToolbox Header Analyzer ↗</h4>
            <p>Visualizes hops and delays. Checks SPF/DKIM alignment.</p>
          </a>
          <a href="https://toolbox.googleapps.com/apps/messageheader/" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>Google Admin Toolbox ↗</h4>
            <p>Deep dive into delivery delays and routing errors.</p>
          </a>
          <a href="https://urlscan.io/" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>urlscan.io ↗</h4>
            <p>Scans URLs and captures screenshots without visiting them.</p>
          </a>
          <a href="https://www.virustotal.com/gui/home/url" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>VirusTotal ↗</h4>
            <p>Check reputation of URLs, IPs, and file hashes against 70+ vendors.</p>
          </a>
          <a href="https://app.any.run/" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>Any.Run (Sandbox) ↗</h4>
            <p>Interactive malware sandbox. Watch the infection in real-time.</p>
          </a>
          <a href="https://phishtank.org/" target="_blank" rel="noreferrer" className="tool-link-card">
            <h4>PhishTank ↗</h4>
            <p>Crowdsourced database of known phishing URLs.</p>
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'anatomy',
    title: 'Anatomy of a Phish',
    icon: '🧬',
    content: (
      <div className="content-section">
        <p className="intro-text">
          As an analyst, your first step is dissecting the communication. Phishing relies on psychological manipulation (urgency, fear, curiosity) combined with technical deception.
        </p>
        <div className="info-card-grid">
          <div className="detail-card">
            <h4 className="cyan">
              <span className="icon">📧</span> The Header
            </h4>
            <ul>
              <li><strong>Return-Path vs. From:</strong> Do they match? A mismatch is a primary indicator of spoofing.</li>
              <li><strong>Received-SPF/DKIM:</strong> Look for 'FAIL' or 'SoftFail'. Legit orgs enforce these.</li>
              <li><strong>Reply-To:</strong> Attackers often set a different Reply-To address to capture responses.</li>
            </ul>
          </div>
          <div className="detail-card">
            <h4 className="red">
              <span className="icon">🔗</span> The Payload (URL/Attachment)
            </h4>
            <ul>
              <li>Typosquatting: <code className="cyan">microsoft-login-secure.com</code> instead of <code>microsoft.com</code>.</li>
              <li>Obfuscation: URL shorteners (bit.ly) or open redirects used to hide the true destination.</li>
              <li>Double Extensions: <code className="red">invoice.pdf.exe</code> relies on Windows hiding known extensions.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'types',
    title: 'Variants & Vectors',
    icon: '🦠',
    content: (
      <div className="content-section">
        <p className="intro-text">
          Phishing is not monolithic. Identifying the specific variant helps in determining the attacker's intent and sophistication level.
        </p>
        <div className="variant-list">
          <div className="variant-item cyan">
            <div>
              <h4>Spear Phishing</h4>
              <p>Highly targeted attack against a specific individual or organization. Uses gathered OSINT (LinkedIn, etc.) to build trust.</p>
            </div>
          </div>
          <div className="variant-item purple">
            <div>
              <h4>Whaling</h4>
              <p>Targeting high-profile executives (C-Suite). Often disguises as legal subpoenas or urgent board matters.</p>
            </div>
          </div>
          <div className="variant-item green">
            <div>
              <h4>BEC (Business Email Compromise)</h4>
              <p>No malicious links. Relies purely on social engineering to trick finance into wiring money. Often compromised vendor accounts.</p>
            </div>
          </div>
          <div className="variant-item yellow">
            <div>
              <h4>Smishing / Vishing</h4>
              <p>Attacks via SMS or Voice. "Your bank account is locked" texts are the most common smishing vector.</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'analysis',
    title: 'Analyst Workflow',
    icon: '🕵️‍♂️',
    content: (
      <div className="content-section">
        <div className="workflow-list">
          <h3>Standard Investigation Procedure (SIP)</h3>
          <ol>
            <li>
              <div className="step-marker"><span>1</span></div>
              <h4>Safe Isolation</h4>
              <p>Never open suspicious links on a production machine. Use a dedicated VM or sandbox (Any.Run, Cuckoo).</p>
            </li>
            <li>
              <div className="step-marker"><span>2</span></div>
              <h4>Header Analysis</h4>
              <p>Extract headers. Check <code>X-Originating-IP</code> and SPF/DKIM/DMARC results. Map the hops.</p>
            </li>
            <li>
              <div className="step-marker"><span>3</span></div>
              <h4>Indicator Extraction (IOCs)</h4>
              <p>Extract URLs, Domains, IPs, and Attachment Hashes. Check reputation on VirusTotal, Talos, and AbuseIPDB.</p>
            </li>
            <li>
              <div className="step-marker"><span>4</span></div>
              <h4>Defensive Action</h4>
              <p>If malicious: Block Sender, Block Domain/URL at proxy, Delete from inboxes (remediation), and Alert users.</p>
            </li>
          </ol>
        </div>
      </div>
    )
  }
];

export default function PhishingDetection() {
  const [activeTab, setActiveTab] = useState('simulator');

  const activeContent = SECTIONS.find(s => s.id === activeTab);

  return (
    <div className="phishing-container">
      {/* HEADER */}
      <div className="tool-header border-b border-slate-700 pb-6 mb-6">
        <h2>
          <span style={{ marginRight: '0.75rem', fontSize: '2rem' }}>🎣</span> Phishing Analysis & Defense
        </h2>
        <p>
          Analyst Guide: Detection methodologies, indicator extraction, and defensive strategies against social engineering.
        </p>
      </div>

      {/* TABS */}
      <div className="tool-tabs">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`tab-item ${activeTab === section.id ? 'active' : ''}`}
          >
            <span style={{ marginRight: '0.5rem' }}>{section.icon}</span>
            {section.title}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2 animate-fade-in">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem', borderLeft: '4px solid #06b6d4', paddingLeft: '1rem' }}>
            {activeContent.title}
        </h3>
        {activeContent.content}
      </div>
    </div>
  );
}
