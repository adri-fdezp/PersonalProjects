import React, { useState } from 'react';

const DETAILS_DATA = {
  ai: {
    title: "AI & Weaponized LLMs",
    icon: "🤖",
    color: "#f472b6",
    content: (
      <>
        <div className="detail-section">
          <h4>1. Polymorphic Malware Generation</h4>
          <p>
            Recent scholarship (2025) highlights the emergence of "Living Off the LLM" (LOLLM) tactics, where adversaries utilize Large Language Models to dynamically obfuscate code structures. 
            By systematically altering variable nomenclature and control flow logic while preserving semantic functionality, these engines generate unique hash signatures for each payload instance, thereby rendering traditional signature-based detection mechanisms ineffective [1].
          </p>
        </div>
        <div className="detail-section">
          <h4>2. High-Fidelity Social Engineering</h4>
          <p>
            The integration of generative AI into phishing campaigns has facilitated "Deep Learning Phishing." 
            Automated agents scrape open-source intelligence (OSINT) to synthesize hyper-personalized communications that mimic target-specific writing styles. 
            Studies indicate this approach significantly increases the efficacy of Business Email Compromise (BEC) vectors compared to generic templates.
          </p>
        </div>
        <div className="detail-section">
          <h4>3. Adversarial Model Manipulation</h4>
          <p>
            Research into "Model Poisoning" demonstrates how injecting malicious samples into training datasets can introduce latent backdoors. 
            Furthermore, "jailbreaking" techniques allow threat actors to bypass safety guardrails of commercial LLMs to generate malicious code snippets or exploit payloads.
          </p>
        </div>
        <div className="key-concept-box">
          <strong>Key Concept: Living Off the LLM (LOLLM)</strong>
          <br/>
          A tactical evolution where attackers leverage legitimate AI capabilities to facilitate cyber operations—ranging from reconnaissance and coding to obfuscation—minimizing the need for custom tooling and lowering the attribution footprint.
        </div>
      </>
    )
  },
  ransomware: {
    title: "Ransomware & Triple Extortion",
    icon: "🔒",
    color: "#f87171",
    content: (
      <>
        <div className="detail-section">
          <h4>1. The RaaS Economic Model</h4>
          <p>
            The Ransomware-as-a-Service (RaaS) ecosystem has matured into a stratified economy. 
            Core developers license ransomware variants to "affiliates" who execute intrusions, often utilizing Initial Access Brokers (IABs) for entry. 
            This specialization reduces the technical barrier for entry, leading to a proliferation of attacks [4].
          </p>
        </div>
        <div className="detail-section">
          <h4>2. Triple Extortion Tactics</h4>
          <p>
            Modern campaigns have evolved beyond data encryption. "Triple Extortion" combines encryption, the exfiltration and threatened release of sensitive data (Double Extortion), and Distributed Denial-of-Service (DDoS) attacks against the victim's infrastructure to maximize leverage during negotiation.
          </p>
        </div>
        <div className="detail-section">
          <h4>3. Intermittent Encryption</h4>
          <p>
            To evade I/O-based detection heuristics, variants such as "Play" and "BlackCat" employ intermittent encryption. 
            This technique encrypts only alternating blocks of data (e.g., every 16 bytes), significantly accelerating the encryption process while effectively rendering files unusable.
          </p>
        </div>
        <div className="key-concept-box">
          <strong>Key Concept: Initial Access Brokers (IABs)</strong>
          <br/>
          Actors who specialize in breaching networks—often via compromised credentials or unpatched vulnerabilities—and monetizing this access by selling it to ransomware affiliates, functioning as the wholesale supply chain of the cybercrime economy.
        </div>
      </>
    )
  },
  geopolitics: {
    title: "Hybrid Warfare & APTs",
    icon: "🌍",
    color: "#fbbf24",
    content: (
      <>
        <div className="detail-section">
          <h4>1. Strategic Pre-positioning</h4>
          <p>
            State-sponsored groups, such as the PRC-linked "Volt Typhoon," are shifting focus from espionage to strategic pre-positioning within critical infrastructure sectors (energy, water, transportation). 
            Reports indicate this presence is intended to facilitate disruptive cyber-kinetic effects in the event of future geopolitical conflict [3].
          </p>
        </div>
        <div className="detail-section">
          <h4>2. Hybrid Warfare Operations</h4>
          <p>
            Cyber operations are increasingly integrated into broader "hybrid warfare" strategies, operating in the "grey zone" between peace and war. 
            This includes the coordination of kinetic military objectives with disruptive cyberattacks (e.g., wipers, DDoS) and disinformation campaigns to destabilize adversary states.
          </p>
        </div>
        <div className="detail-section">
          <h4>3. Living off the Land (LotL)</h4>
          <p>
            Advanced Persistent Threats (APTs) increasingly utilize "Living off the Land" techniques, abusing legitimate system administration tools (PowerShell, WMI) to blend malicious activity with normal network operations. 
            This "fileless" approach complicates detection by Endpoint Detection and Response (EDR) systems.
          </p>
        </div>
        <div className="key-concept-box">
          <strong>Key Concept: Grey Zone Warfare</strong>
          <br/>
          Coercive statecraft actions that remain below the threshold of conventional armed conflict. In cyberspace, this manifests as operations designed to disrupt, degrade, or deny adversary capabilities without triggering a kinetic military response.
        </div>
      </>
    )
  },
  supplychain: {
    title: "Supply Chain & CI/CD",
    icon: "🔗",
    color: "#a78bfa",
    content: (
      <>
        <div className="detail-section">
          <h4>1. Upstream Contamination</h4>
          <p>
            Adversaries are increasingly targeting the "upstream" software supply chain by compromising open-source repositories or developer accounts. 
            Incidents like the XZ Utils backdoor illustrate how social engineering can be used to inject malicious code into widely trusted libraries, affecting downstream ecosystems globally.
          </p>
        </div>
        <div className="detail-section">
          <h4>2. Dependency Confusion & Repo Jacking</h4>
          <p>
            Techniques such as "Repo Jacking" (taking over abandoned repositories) and "Dependency Confusion" (tricking installers into pulling malicious private-named packages from public repositories) exploit trust relationships in package management systems (npm, PyPI) to execute code on developer workstations.
          </p>
        </div>
        <div className="detail-section">
          <h4>3. CI/CD Pipeline Integrity</h4>
          <p>
            The automation of build pipelines (CI/CD) presents a high-value target. 
            Compromising these environments allows attackers to tamper with the compilation process or steal code-signing certificates, enabling the distribution of malware that appears legitimate to operating system security controls.
          </p>
        </div>
        <div className="key-concept-box">
          <strong>Key Concept: Software Bill of Materials (SBOM)</strong>
          <br/>
          A formal, machine-readable inventory of software components and dependencies. SBOMs are cited as a critical requirement for vulnerability management, enabling organizations to rapidly assess exposure to supply chain risks [9].
        </div>
      </>
    )
  }
};

export default function ThreatContextReport() {
  const [activeDetail, setActiveDetail] = useState(null); // 'ai', 'ransomware', etc. or null

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // --- RENDER DETAIL VIEW ---
  if (activeDetail && DETAILS_DATA[activeDetail]) {
    const data = DETAILS_DATA[activeDetail];
    return (
        <div className="report-container animate-fade-in" style={{ padding: '0 1rem 3rem 1rem', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <button 
                    onClick={() => setActiveDetail(null)}
                    style={{ 
                        background: 'transparent', 
                        color: '#38bdf8', 
                        border: 'none', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.9rem',
                        padding: '0.5rem 0', // Increased touch target
                        transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = 0.8}
                    onMouseOut={(e) => e.target.style.opacity = 1}
                >
                    <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>←</span> Back to Report
                </button>
            </div>

            <div style={{ borderBottom: `2px solid ${data.color}`, paddingBottom: '1.5rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#f8fafc', display: 'flex', alignItems: 'center', margin: 0 }}>
                    <span style={{ marginRight: '1.5rem', fontSize: '3rem', lineHeight: 1 }}>{data.icon}</span> 
                    {data.title}
                </h2>
            </div>

            <div className="detail-content" style={{ maxWidth: '850px', margin: '0 auto' }}> {/* Centered max-width for readability */}
                {data.content}
            </div>
            
            <style>{`
                .detail-section { margin-bottom: 3.5rem; } /* Increased vertical rhythm */
                .detail-section h4 { color: ${data.color}; font-size: 1.4rem; margin-bottom: 1rem; font-weight: 600; }
                .detail-section p { color: #cbd5e1; line-height: 1.8; font-size: 1.05rem; margin-bottom: 0; }
                .key-concept-box { background: #1e293b; border-left: 5px solid ${data.color}; padding: 2rem; border-radius: 0 0.75rem 0.75rem 0; margin-top: 4rem; color: #e2e8f0; line-height: 1.7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            `}</style>
        </div>
    );
  }

  // --- RENDER MAIN GRID VIEW ---
  return (
    <div className="report-container animate-fade-in" style={{ padding: '0 1rem 3rem 1rem', maxWidth: '100%', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' }}>
      
      {/* REPORT HEADER */}
      <div className="report-header" style={{ borderBottom: '1px solid #334155', paddingBottom: '2rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#f8fafc', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>
              Strategic Intelligence Report
            </h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Deep Dive Analysis: 2025 Threat Landscape, TTPs, and Defensive Posture
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', marginBottom: '0.25rem' }}>Report Date</p>
            <p style={{ fontSize: '1rem', fontWeight: '600', color: '#cbd5e1', fontFamily: 'monospace' }}>{reportDate}</p>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <section style={{ marginBottom: '4rem', maxWidth: '900px' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#38bdf8', marginBottom: '1.5rem', borderLeft: '4px solid #38bdf8', paddingLeft: '1.25rem', fontWeight: '700' }}>
          Executive Summary
        </h3>
        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#cbd5e1' }}>
          The 2025 threat landscape is characterized by the <strong>democratization of advanced offensive capabilities</strong> and the increasing integration of cyber operations into <strong>hybrid warfare strategies</strong>. 
          Academic and industry analysis highlights the weaponization of Large Language Models (LLMs) to automate polymorphic malware generation and high-fidelity social engineering. 
          Concurrently, the "Ransomware-as-a-Service" model continues to evolve with "Triple Extortion" tactics, while state actors prioritize strategic pre-positioning within critical infrastructure. 
          This report synthesizes findings from recent scholarship to analyze these shifting paradigms.
        </p>
      </section>

      {/* KEY FINDINGS GRID (CLICK TO NAVIGATE) */}
      <div className="findings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        
        {/* CARD 1: AI */}
        <div 
            onClick={() => setActiveDetail('ai')}
            className="cyber-card-interactive"
            style={{ 
                background: 'rgba(30, 41, 59, 0.4)', 
                backdropFilter: 'blur(8px)',
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = '#f472b6'; 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = '#334155'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', color: '#f472b6', margin: 0, display: 'flex', alignItems: 'center', marginBottom: '1.25rem', fontWeight: '700' }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.5rem' }}>🤖</span> AI & Weaponized LLMs
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                Polymorphic malware, automated spear-phishing, and adversarial model poisoning.
            </p>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#f472b6', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            Read Analysis <span style={{ marginLeft: '0.5rem' }}>→</span>
          </div>
        </div>

        {/* CARD 2: RANSOMWARE */}
        <div 
            onClick={() => setActiveDetail('ransomware')}
            className="cyber-card-interactive"
            style={{ 
                background: 'rgba(30, 41, 59, 0.4)', 
                backdropFilter: 'blur(8px)',
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = '#f87171'; 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = '#334155'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', color: '#f87171', margin: 0, display: 'flex', alignItems: 'center', marginBottom: '1.25rem', fontWeight: '700' }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.5rem' }}>🔒</span> RaaS & Triple Extortion
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                The industrialization of cybercrime, intermittent encryption, and initial access brokers.
            </p>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#f87171', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            Read Analysis <span style={{ marginLeft: '0.5rem' }}>→</span>
          </div>
        </div>

        {/* CARD 3: GEOPOLITICS */}
        <div 
            onClick={() => setActiveDetail('geopolitics')}
            className="cyber-card-interactive"
            style={{ 
                background: 'rgba(30, 41, 59, 0.4)', 
                backdropFilter: 'blur(8px)',
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = '#fbbf24'; 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = '#334155'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', color: '#fbbf24', margin: 0, display: 'flex', alignItems: 'center', marginBottom: '1.25rem', fontWeight: '700' }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.5rem' }}>🌍</span> Hybrid Warfare & APTs
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                State-sponsored stealth, Hacktivism 2.0, and "Living off the Land" techniques.
            </p>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#fbbf24', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            Read Analysis <span style={{ marginLeft: '0.5rem' }}>→</span>
          </div>
        </div>

        {/* CARD 4: SUPPLY CHAIN */}
        <div 
            onClick={() => setActiveDetail('supplychain')}
            className="cyber-card-interactive"
            style={{ 
                background: 'rgba(30, 41, 59, 0.4)', 
                backdropFilter: 'blur(8px)',
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = '#a78bfa'; 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = '#334155'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
        >
          <div>
            <h4 style={{ fontSize: '1.25rem', color: '#a78bfa', margin: 0, display: 'flex', alignItems: 'center', marginBottom: '1.25rem', fontWeight: '700' }}>
                <span style={{ marginRight: '0.75rem', fontSize: '1.5rem' }}>🔗</span> Supply Chain & CI/CD
            </h4>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                Upstream contamination, repo jacking, and the necessity of SBOMs.
            </p>
          </div>
          <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#a78bfa', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            Read Analysis <span style={{ marginLeft: '0.5rem' }}>→</span>
          </div>
        </div>

      </div>

      {/* TECHNICAL GLOSSARY SECTION */}
      <section style={{ marginBottom: '5rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#4ade80', marginBottom: '2rem', borderLeft: '4px solid #4ade80', paddingLeft: '1.25rem', fontWeight: '700' }}>
          Technical Concepts Dictionary
        </h3>
        <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2.5rem', maxWidth: '800px' }}>
            Key terminology and mechanisms referenced in modern threat intelligence reports.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div style={{ padding: '1.5rem', borderLeft: '3px solid #334155', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '0 0.5rem 0.5rem 0' }}>
                <h5 style={{ color: '#e2e8f0', fontWeight: '700', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Zero-Day Exploit</h5>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                    An attack that targets a software vulnerability which is unknown to the vendor or has no patch available. It occurs on "day zero" of awareness.
                </p>
            </div>

            <div style={{ padding: '1.5rem', borderLeft: '3px solid #334155', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '0 0.5rem 0.5rem 0' }}>
                <h5 style={{ color: '#e2e8f0', fontWeight: '700', marginBottom: '0.75rem', fontSize: '1.1rem' }}>C2 (Command & Control)</h5>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                    The centralized server infrastructure attackers use to communicate with compromised devices (bots), sending instructions and receiving stolen data.
                </p>
            </div>

            <div style={{ padding: '1.5rem', borderLeft: '3px solid #334155', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '0 0.5rem 0.5rem 0' }}>
                <h5 style={{ color: '#e2e8f0', fontWeight: '700', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Lateral Movement</h5>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.6' }}>
                    The technique of moving deeper into a network after initial access, hopping from device to device to find high-value assets (like the Domain Controller).
                </p>
            </div>
        </div>
      </section>

      {/* SOURCES & REFERENCES */}
      <section style={{ background: '#0f172a', padding: '2.5rem', borderRadius: '0.75rem', borderTop: '1px solid #334155' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
          Selected Academic & Industry References (2024-2025)
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '2rem' }}>
          This analysis draws upon peer-reviewed research and technical reports regarding the evolving cyber threat landscape.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
          <div style={{ marginBottom: '0.5rem' }}>[1] Ma et al., "Living Off the LLM: How LLMs Will Change Adversary Tactics," <em>arXiv preprint</em>, 2025.</div>
          <div style={{ marginBottom: '0.5rem' }}>[2] CISA, "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure," 2024.</div>
          <div style={{ marginBottom: '0.5rem' }}>[3] "Volt Typhoon Explained: Living Off the Land Tactics for Cyber Espionage," <em>Picus Security Research</em>, 2024.</div>
          <div style={{ marginBottom: '0.5rem' }}>[4] "Ransomware Rewired: The Evolution of Extortion," <em>International Journal of Computer Applications</em>, 2025.</div>
          <div style={{ marginBottom: '0.5rem' }}>[5] "Hybrid Warfare in the 21st Century," <em>50 Shades of Statecraft</em>, 2025.</div>
          <div style={{ marginBottom: '0.5rem' }}>[6] "Security and Quality in LLM-Generated Code," <em>arXiv</em>, 2025.</div>
        </div>
      </section>

    </div>
  );
}