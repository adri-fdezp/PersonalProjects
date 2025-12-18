import React, { useState } from 'react';
import { 
  FaBolt, FaToolbox, FaDna, FaBug, FaUserSecret, 
  FaPaste, FaPlay, FaExclamationTriangle, FaCheckCircle, 
  FaShieldAlt, FaExternalLinkAlt 
} from 'react-icons/fa';

// --- Header Analyzer Component ---
function HeaderAnalyzer() {
  const [headerText, setHeaderText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeHeaders = () => {
    if (!headerText) return;

    // Regex Logic
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

    setAnalysis({ returnPath, from, spf, dkim, ip, riskScore, flags });
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
    <div className={`analyzer-layout ${analysis ? 'has-results' : ''}`}>
      
      {/* INPUT SECTION */}
      <div className="input-panel">
        <div className="panel-header">
          <h4><FaPaste /> Raw Headers</h4>
          <button onClick={loadSample} className="text-btn">Load Malicious Sample</button>
        </div>
        <div className="editor-wrapper">
          <textarea 
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            placeholder="Paste email headers here to begin analysis..."
            spellCheck="false"
          />
        </div>
        <button onClick={analyzeHeaders} className="action-btn">
          <FaPlay /> Analyze Headers
        </button>
      </div>

      {/* RESULTS SECTION */}
      {analysis && (
        <div className="results-panel animate-slide-in">
          <div className="panel-header">
             <h4>Analysis Report</h4>
             <div className={`risk-tag ${analysis.riskScore > 2 ? 'high' : analysis.riskScore > 0 ? 'medium' : 'low'}`}>
               {analysis.riskScore > 2 ? 'High Risk' : analysis.riskScore > 0 ? 'Medium Risk' : 'Low Risk'}
             </div>
          </div>

          <div className="metrics-list">
             <div className="metric-item">
                <label>Return-Path</label>
                <div className="value">{analysis.returnPath}</div>
             </div>
             <div className="metric-item">
                <label>From Address</label>
                <div className="value">{analysis.from}</div>
             </div>
             <div className="metric-item">
                <label>SPF Status</label>
                <div className={`value ${analysis.spf.toLowerCase().includes('fail') ? 'text-red' : 'text-green'}`}>
                  {analysis.spf}
                </div>
             </div>
             <div className="metric-item">
                <label>Originating IP</label>
                <div className="value">{analysis.ip}</div>
             </div>
          </div>

          {analysis.flags.length > 0 ? (
            <div className="flags-container">
              <h5><FaExclamationTriangle /> Detected Threats</h5>
              <ul>
                {analysis.flags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="safe-container">
              <FaCheckCircle /> <span>No obvious anomalies detected in headers.</span>
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
    icon: <FaBolt />,
    description: 'Interactive email header analysis sandbox.',
    content: (
      <div className="section-content">
        <HeaderAnalyzer />
      </div>
    )
  },
  {
    id: 'tools',
    title: 'Tool Locker',
    icon: <FaToolbox />,
    description: 'External utilities for safe verification.',
    content: (
      <div className="grid-layout">
        <a href="https://mxtoolbox.com/EmailHeaders.aspx" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>MxToolbox Analyzer</h4>
          <p>Visualizes hops and delays. Checks SPF/DKIM alignment.</p>
        </a>
        <a href="https://toolbox.googleapps.com/apps/messageheader/" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>Google Admin Toolbox</h4>
          <p>Deep dive into delivery delays and routing errors.</p>
        </a>
        <a href="https://urlscan.io/" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>urlscan.io</h4>
          <p>Scans URLs and captures screenshots safely.</p>
        </a>
        <a href="https://www.virustotal.com/gui/home/url" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>VirusTotal</h4>
          <p>Reputation check against 70+ security vendors.</p>
        </a>
        <a href="https://app.any.run/" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>Any.Run Sandbox</h4>
          <p>Interactive malware sandbox for real-time analysis.</p>
        </a>
        <a href="https://phishtank.org/" target="_blank" rel="noreferrer" className="card-link">
          <div className="card-icon"><FaExternalLinkAlt /></div>
          <h4>PhishTank</h4>
          <p>Crowdsourced database of known phishing URLs.</p>
        </a>
      </div>
    )
  },
  {
    id: 'anatomy',
    title: 'Anatomy',
    icon: <FaDna />,
    description: 'Dissecting the structure of a phishing attack.',
    content: (
      <div className="split-layout">
        <div className="info-card">
          <h4 className="text-cyan"><FaUserSecret /> The Header & Metadata</h4>
          <ul>
            <li><strong>Return-Path vs. From:</strong> A mismatch is a primary indicator of "Display Name Spoofing" or envelope forgery.</li>
            <li><strong>Received-SPF/DKIM:</strong> Analyze 'Authentication-Results'. Legit organizations rarely fail these; a 'SoftFail' often warrants quarantine.</li>
            <li><strong>Reply-To Header:</strong> Check if responses are diverted to a look-alike domain (e.g., @microsoft-support.com instead of @microsoft.com).</li>
            <li><strong>X-Mailer:</strong> Identifies the software used to send the email. Unusual mailers (like 'PHP Mailer') for corporate accounts are suspicious.</li>
            <li><strong>Message-ID:</strong> Validating the domain in the Message-ID against the sender domain can reveal automated bulk-mailing tools.</li>
          </ul>
        </div>
        <div className="info-card">
          <h4 className="text-red"><FaBug /> The Payload & Social Engineering</h4>
          <ul>
            <li><strong>Typosquatting:</strong> <code className="code-pill">micros0ft.com</code> or <code className="code-pill">login-apple.id</code>. Look for visually similar characters (homoglyphs).</li>
            <li><strong>URL Obfuscation:</strong> Use of open redirects (e.g., <code>google.com/url?q=malicious.com</code>) to bypass reputation filters.</li>
            <li><strong>Sense of Urgency:</strong> Keywords like 'Immediate Action Required', 'Account Suspended', or 'Legal Notice' designed to bypass critical thinking.</li>
            <li><strong>Hidden Extensions:</strong> Files like <code className="code-pill">report.pdf.js</code> exploit the "Hide extensions for known file types" setting in Windows.</li>
            <li><strong>Zero-Font/Small-Text:</strong> Attackers hide "Safe" text in 0px fonts to confuse automated NLP scanners.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'types',
    title: 'Variants',
    icon: <FaShieldAlt />,
    description: 'Common attack vectors and methodologies.',
    content: (
      <div className="grid-layout">
        <div className="info-card variant-card">
          <h4>Spear Phishing</h4>
          <p>Highly targeted attack using OSINT to build trust with specific individuals.</p>
        </div>
        <div className="info-card variant-card">
          <h4>Whaling</h4>
          <p>Targeting C-Suite executives with fake legal subpoenas or board matters.</p>
        </div>
        <div className="info-card variant-card">
          <h4>BEC (Business Email Compromise)</h4>
          <p>Social engineering without links, tricking finance into wire transfers.</p>
        </div>
        <div className="info-card variant-card">
          <h4>Smishing / Vishing</h4>
          <p>Attacks via SMS or Voice. "Your account is locked" is a common pretext.</p>
        </div>
      </div>
    )
  },
  {
    id: 'workflow',
    title: 'Workflow',
    icon: <FaCheckCircle />,
    description: 'Standard Investigation Procedure (SIP).',
    content: (
      <div className="workflow-steps">
        <div className="step-card">
          <div className="step-number">01</div>
          <div>
            <h4>Safe Triage & Isolation</h4>
            <p>Download the email source (.eml) or headers. Move to a non-persistent Virtual Machine or a dedicated sandbox environment. Never interact with links or attachments on your primary workstation.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">02</div>
          <div>
            <h4>Technical Header Analysis</h4>
            <p>Perform a reverse IP lookup on the <code>X-Originating-IP</code>. Verify SPF, DKIM, and DMARC alignment. Map the 'Received' hops to find the true geographic origin of the transmission.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">03</div>
          <div>
            <h4>Indicator Extraction (IOCs)</h4>
            <p>Defang URLs (e.g., <code>hxxp://...</code>) before documentation. Extract file hashes (MD5/SHA256) and check against global databases like VirusTotal or Hybrid Analysis.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">04</div>
          <div>
            <h4>Reputation & Threat Intel</h4>
            <p>Check the registration date of the sender's domain. Domains created in the last 30 days (Newly Observed Domains) are significantly more likely to be malicious.</p>
          </div>
        </div>
        <div className="step-card">
          <div className="step-number">05</div>
          <div>
            <h4>Remediation & Hunting</h4>
            <p>Block the IOCs at the perimeter (Firewall/Proxy). Perform a "Sweep" across the organization's mail server (O365/GSuite) to find and delete similar messages from other inboxes.</p>
          </div>
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
      <div className="phishing-header">
        <div>
          <h2>Phishing Defense Center</h2>
          <p className="subtitle">Analyze headers, verify IOCs, and understand attack vectors.</p>
        </div>
        <div className="tabs-nav">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`nav-item ${activeTab === section.id ? 'active' : ''}`}
              title={section.title}
            >
              <span className="icon">{section.icon}</span>
              <span className="label">{section.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="phishing-content">
        <div className="section-header">
          <h3>{activeContent.title}</h3>
          <p>{activeContent.description}</p>
        </div>
        <div className="content-body animate-fade-in">
          {activeContent.content}
        </div>
      </div>
    </div>
  );
}