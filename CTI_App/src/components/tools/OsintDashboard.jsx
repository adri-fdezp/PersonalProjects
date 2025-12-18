import React, { useState } from 'react';

const osintData = {
  "Search Engines": [
    { name: "Google Dorks (GHDB)", url: "https://www.exploit-db.com/google-hacking-database", desc: "Vulnerability search" },
    { name: "Shodan", url: "https://www.shodan.io/", desc: "IoT/Infrastructure search" },
    { name: "Wayback Machine", url: "https://archive.org/web/", desc: "Historical web data" },
    { name: "Censys", url: "https://censys.io/", desc: "Network attack surface" },
    { name: "Google Advanced", url: "https://www.google.com/advanced_search", desc: "Precise queries" },
    { name: "DuckDuckGo", url: "https://duckduckgo.com/", desc: "Privacy search" },
    { name: "Yandex", url: "https://yandex.com/", desc: "Russian/Eastern EU search" },
    { name: "Baidu", url: "https://www.baidu.com/", desc: "Chinese search engine" },
    { name: "Bing", url: "https://www.bing.com/", desc: "Microsoft search" },
    { name: "GreyNoise", url: "https://www.greynoise.io/", desc: "Internet noise filter" }
  ],
  "Threat Intel": [
    { name: "VirusTotal", url: "https://www.virustotal.com/", desc: "Malware analysis" },
    { name: "AlienVault OTX", url: "https://otx.alienvault.com/", desc: "Threat exchange" },
    { name: "Urlscan.io", url: "https://urlscan.io/", desc: "Web scanner/sandbox" },
    { name: "Any.Run", url: "https://any.run/", desc: "Interactive malware sandbox" },
    { name: "Talos Intelligence", url: "https://talosintelligence.com/", desc: "Cisco threat data" },
    { name: "Hybrid Analysis", url: "https://www.hybrid-analysis.com/", desc: "Payload analysis" },
    { name: "Pulsedive", url: "https://pulsedive.com/", desc: "Threat intelligence platform" },
    { name: "IBM Talos", url: "https://www.talosintelligence.com/reputation_center", desc: "IP/Domain Reputation" },
    { name: "AbuseIPDB", url: "https://www.abuseipdb.com/", desc: "IP reputation check" }
  ],
  "Domain & IP": [
    { name: "DNSDumpster", url: "https://dnsdumpster.com/", desc: "DNS visualizer" },
    { name: "ViewDNS.info", url: "https://viewdns.info/", desc: "DNS toolkit" },
    { name: "SecurityTrails", url: "https://securitytrails.com/", desc: "Historical DNS" },
    { name: "Who.is", url: "https://who.is/", desc: "Registration data" },
    { name: "CRT.sh", url: "https://crt.sh/", desc: "Certificate transparency" },
    { name: "MXToolbox", url: "https://mxtoolbox.com/", desc: "Mail server check" },
    { name: "IPinfo.io", url: "https://ipinfo.io/", desc: "IP geolocation" },
    { name: "BGP.he.net", url: "https://bgp.he.net/", desc: "BGP routing info" },
    { name: "Hurricane Electric", url: "https://bgp.he.net/", desc: "Network tools" }
  ],
  "Social Media": [
    { name: "LinkedIn", url: "https://www.linkedin.com/", desc: "Professional recon" },
    { name: "Twitter (X)", url: "https://twitter.com/", desc: "Real-time intel" },
    { name: "Reddit", url: "https://www.reddit.com/", desc: "Community discussions" },
    { name: "Telegram Web", url: "https://web.telegram.org/", desc: "Messaging analysis" },
    { name: "Discord", url: "https://discord.com/", desc: "Chat communities" },
    { name: "Facebook", url: "https://www.facebook.com/", desc: "Social recon" },
    { name: "Instagram", url: "https://www.instagram.com/", desc: "Visual intel" },
    { name: "Mastodon", url: "https://mastodon.social/", desc: "Decentralized social" }
  ],
  "Username & People": [
    { name: "Sherlock", url: "https://github.com/sherlock-project/sherlock", desc: "Social media hunter" },
    { name: "WhatsMyName", url: "https://whatsmyname.app/", desc: "Username enumeration" },
    { name: "Have I Been Pwned", url: "https://haveibeenpwned.com/", desc: "Breach check" },
    { name: "Epieos", url: "https://epieos.com/", desc: "Email/Phone lookup" },
    { name: "Namechk", url: "https://namechk.com/", desc: "Availability check" },
    { name: "UserSearch.ai", url: "https://usersearch.ai/", desc: "AI people search" },
    { name: "Namevine", url: "https://namevine.com/", desc: "Unified name search" },
    { name: "Hunter.io", url: "https://hunter.io/", desc: "Email finder" }
  ],
  "Images & Video": [
    { name: "TinEye", url: "https://tineye.com/", desc: "Reverse image search" },
    { name: "Yandex Images", url: "https://yandex.com/images/", desc: "Best for faces/RU" },
    { name: "PimEyes", url: "https://pimeyes.com/", desc: "Face recognition" },
    { name: "Google Images", url: "https://images.google.com/", desc: "General reverse search" },
    { name: "Imginn", url: "https://imginn.com/", desc: "Instagram viewer" },
    { name: "ExifTool", url: "https://exiftool.org/", desc: "Metadata analysis" },
    { name: "SunCalc", url: "https://suncalc.org/", desc: "Shadow/Sun analysis" },
    { name: "YT5s", url: "https://yt5s.com/", desc: "YouTube downloader" }
  ],
  "OpSec & Privacy": [
    { name: "Tor Project", url: "https://www.torproject.org/", desc: "Anonymity network" },
    { name: "ProtonMail", url: "https://proton.me/mail", desc: "Encrypted email" },
    { name: "Temp Mail", url: "https://temp-mail.org/", desc: "Disposable email" },
    { name: "PrivacyTools", url: "https://www.privacytools.io/", desc: "Privacy guide" },
    { name: "BrowserLeaks", url: "https://browserleaks.com/", desc: "Fingerprint check" }
  ],
  "Start.me Catalogs": [
    { name: "Blue_osintguy", url: "https://start.me/p/vjOnJq/blue_osintguy-tools", desc: "Blue_osintguy tools" },
    { name: "CTI", url: "https://start.me/p/zp4Peg/cti", desc: "CTI tools" },
    { name: "Keyborad Komando", url: "https://start.me/p/6rOGjm/osint", desc: "Keyborad Komando tools" },
  ]
};

export default function OsintDashboard() {
  const [activeCategory, setActiveCategory] = useState(Object.keys(osintData)[0]); // Set initial active category to the first one available

  return (
    <div className="tool-view-container">
      {/* HEADER SECTION */}
      <div className="tool-header">
        <h2>OSINT Framework</h2>
        <p>
          Open Source Intelligence tools for reconnaissance and investigation.
        </p>
      </div>

      {/* NAVIGATION TABS */}
      <div className="tool-tabs">
        {Object.keys(osintData).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`tab-item ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 min-h-0">
        {/* TOOLS GRID */}
        <div className="tool-grid">
        {osintData[activeCategory].map((tool, index) => (
            <a
            key={index}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tool-item"
            >
            <div>
                <div className="tool-item-header">
                    <div className="tool-item-title-group">
                         <img 
                            src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=32`} 
                            alt={tool.name} 
                            onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                        <h3>{tool.name}</h3>
                    </div>
                    <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </div>
                <p>{tool.desc}</p>
            </div>
            </a>
        ))}
        </div>
      </div>
    </div>
  );
}