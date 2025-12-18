import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';

// --- DATA ---
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const THREAT_DATA = [
  // North America
  { id: 'USA', name: 'United States', risk: 95, type: 'Prime Target', details: 'Ransomware, Critical Infra, IP Theft' },
  { id: 'CAN', name: 'Canada', risk: 75, type: 'Target', details: 'Espionage, Government Sector' },
  { id: 'MEX', name: 'Mexico', risk: 70, type: 'Target', details: 'Banking Trojans, Cartel Cyber Ops' },

  // South America
  { id: 'BRA', name: 'Brazil', risk: 85, type: 'High Risk', details: 'Banking Trojans, Ransomware, FinCrime' },
  { id: 'ARG', name: 'Argentina', risk: 65, type: 'Target', details: 'Hacktivism, Government Data Leaks' },
  { id: 'CHL', name: 'Chile', risk: 68, type: 'Target', details: 'Ransomware, Govt Consumer Agency Attacks' },
  { id: 'COL', name: 'Colombia', risk: 60, type: 'Target', details: 'Ransomware, Critical Infra' },

  // Europe
  { id: 'UKR', name: 'Ukraine', risk: 98, type: 'Conflict Zone', details: 'Ground Zero, Wipers, Grid Attacks' },
  { id: 'RUS', name: 'Russia', risk: 90, type: 'Aggressor', details: 'State-Sponsored Espionage, Disinfo' },
  { id: 'GBR', name: 'United Kingdom', risk: 80, type: 'Target', details: 'Ransomware, Supply Chain' },
  { id: 'DEU', name: 'Germany', risk: 75, type: 'Target', details: 'Industrial Espionage, Manufacturing' },
  { id: 'FRA', name: 'France', risk: 75, type: 'Target', details: 'Olympics 2024 Targeting, Ransomware' },
  { id: 'ITA', name: 'Italy', risk: 78, type: 'Target', details: 'Public Admin Ransomware, Espionage' },
  { id: 'ESP', name: 'Spain', risk: 72, type: 'Target', details: 'Banking Phishing, Qilin Ransomware' },
  { id: 'SWE', name: 'Sweden', risk: 82, type: 'Target', details: 'Supply Chain Attacks, Data Extortion' },
  { id: 'FIN', name: 'Finland', risk: 85, type: 'Frontline', details: 'Pro-Russian DDoS, Critical Infra' },
  { id: 'POL', name: 'Poland', risk: 85, type: 'Frontline', details: 'Logistics Targeting, Espionage' },

  // Asia / Middle East
  { id: 'CHN', name: 'China', risk: 92, type: 'Nation State', details: 'APT Activity, IP Theft, Surveillance' },
  { id: 'TWN', name: 'Taiwan', risk: 96, type: 'Conflict Zone', details: 'Semiconductor Espionage, State-Backed Attacks' },
  { id: 'SGP', name: 'Singapore', risk: 76, type: 'Target', details: 'APT Espionage (UNC3886), Ransomware' },
  { id: 'IND', name: 'India', risk: 82, type: 'Target', details: 'Malware Hub, Govt Sector, Healthcare' },
  { id: 'JPN', name: 'Japan', risk: 78, type: 'Target', details: 'Industrial Espionage, Crypto Theft' },
  { id: 'IRN', name: 'Iran', risk: 88, type: 'Aggressor', details: 'Critical Infra Attacks, Wipers' },
  { id: 'ISR', name: 'Israel', risk: 95, type: 'Conflict Zone', details: 'Hacktivism, Rocket Alert Apps, DDoS' },
  { id: 'TUR', name: 'Turkey', risk: 74, type: 'Target', details: 'Defense Industry Espionage, Ransomware' },
  { id: 'SAU', name: 'Saudi Arabia', risk: 70, type: 'Target', details: 'Energy Sector, Ransomware' },
  { id: 'ARE', name: 'UAE', risk: 65, type: 'Target', details: 'Finance Phishing, Ransomware' },
  { id: 'KOR', name: 'South Korea', risk: 80, type: 'Target', details: 'North Korean APTs, Crypto Theft' },
  { id: 'PRK', name: 'North Korea', risk: 85, type: 'Aggressor', details: 'Financial Heists, Nuclear Espionage' },
  { id: 'VNM', name: 'Vietnam', risk: 60, type: 'Emerging', details: 'Crypto Mining, APT32 Activity' },

  // Africa
  { id: 'ZAF', name: 'South Africa', risk: 75, type: 'High Risk', details: 'Ransomware, Insider Threats, Infra' },
  { id: 'NGA', name: 'Nigeria', risk: 85, type: 'Hub', details: 'BEC Scams, Ransomware, Banking Fraud' },
  { id: 'KEN', name: 'Kenya', risk: 72, type: 'Target', details: 'Infra Ransomware, APT Espionage' },
  { id: 'EGY', name: 'Egypt', risk: 70, type: 'Target', details: 'Data Breaches, Telecom DDoS' },

  // Oceania
  { id: 'AUS', name: 'Australia', risk: 72, type: 'Target', details: 'Critical Infra, Data Breaches' },
];

const RANSOMWARE_DATA = [
  { name: 'RansomHub', victims: 736, revenue: 'High' },
  { name: 'LockBit 3.0', victims: 545, revenue: 'Very High' },
  { name: 'Play', victims: 362, revenue: 'Med' },
  { name: 'Akira', victims: 349, revenue: 'Med' },
  { name: 'Qilin', victims: 200, revenue: 'High' },
];

const VECTOR_DATA = [
  { name: 'Vuln Exploitation', value: 38 },
  { name: 'Phishing', value: 17 },
  { name: 'Valid Accounts', value: 29 },
  { name: 'Ext Remote Svc', value: 9 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#1e293b", "#ef4444"]);

export default function ThreatCharts() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapPosition, setMapPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  const handleZoomIn = () => {
    if (mapPosition.zoom >= 4) return;
    setMapPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (mapPosition.zoom <= 1) return;
    setMapPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setMapPosition(position);
  };

  return (
    <div className="charts-container">
      
      {/* HEADER */}
      <div className="charts-main-header">
        <div>
          <h1>
            Global Threat Operations Center
          </h1>
          <p>Data Source: 2024-2025 Intelligence Reports (Mandiant, Verizon DBIR, Cyberint)</p>
        </div>
      </div>

      {/* INTERACTIVE MAP & DETAILS PANEL */}
      <div className="cyber-card map-panel-wrapper">
        
        {/* LEFT SIDE PANEL */}
        <div className="map-side-panel">
            <div>
                <h3 className="heading-card map-side-panel-header">
                    Threat Intelligence
                </h3>
                {selectedCountry ? (
                    <div className="animate-fade-in map-country-details">
                        <div className="row">
                            <span className="flag-icon">📍</span>
                            <h4>{selectedCountry.name}</h4>
                        </div>
                        
                                             <div className="risk-score-box">
                                                <span className="label">Cyber Risk Score</span>
                                                <div className="value" style={{ color: colorScale(selectedCountry.risk) }}>
                                                    {selectedCountry.risk}<span>/100</span>
                                                </div>
                                                <p>
                                                    <strong>Risk Context:</strong> Composite index reflecting frequency of APT targeting, malware infection rates, and geopolitical exposure intensity.
                                                </p>
                                             </div>
                        
                                             <div className="classification-box">
                                                <span className="label">Classification</span>
                                                <div className="value">{selectedCountry.type}</div>
                                                <p>
                                                    {selectedCountry.type === 'Aggressor' || selectedCountry.type === 'Nation State' ? 'Active source of offensive cyber operations.' : 
                                                     selectedCountry.type === 'Conflict Zone' ? 'Region experiencing active kinetic and cyber warfare.' :
                                                     'Primary destination for targeted cyber espionage or criminal campaigns.'}
                                                </p>
                                             </div>
                        <div className="kpi-box">
                            <span className="label">Key Threat Indicators</span>
                            <div className="value">{selectedCountry.details}</div>
                        </div>
                    </div>
                ) : (
                    <div className="map-side-panel-empty">
                        <span>🗺️</span>
                        <p>Select a country on the map to view its detailed cyber threat profile.</p>
                    </div>
                )}
            </div>
            
            {/* Source Footer */}
            <div className="map-side-panel-source-footer">
                <span>Source:</span> Global Threat Intelligence Report 2025 (Mandiant, CrowdStrike)
            </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <div className="map-main-area">
            <h3 className="heading-card hotspots-title">
            Geopolitical Hotspots
            </h3>
            
            {/* Zoom Controls */}
            <div className="zoom-controls">
                <button onClick={handleZoomIn} className="map-zoom-button">+</button>
                <button onClick={handleZoomOut} className="map-zoom-button">−</button>
            </div>

            <div className="map-canvas">
                <ComposableMap projectionConfig={{ scale: 160 }} width={900} height={500} style={{ width: "100%", height: "100%" }}>
                    <ZoomableGroup 
                        zoom={mapPosition.zoom} 
                        center={mapPosition.coordinates} 
                        onMoveEnd={handleMoveEnd}
                        translateExtent={[[0, 0], [900, 500]]}
                    >
                        <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                    geographies.map((geo) => {
                        const d = THREAT_DATA.find((s) => 
                            s.id === geo.id || 
                            s.id === geo.properties.ISO_A3 || 
                            s.name === geo.properties.name ||
                            (geo.properties.name && geo.properties.name.includes(s.name))
                        );
                        return (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onClick={() => {
                                if(d) setSelectedCountry(d);
                                else setSelectedCountry({ 
                                    name: geo.properties.name || 'Unknown', 
                                    risk: 0, 
                                    type: 'Low Activity', 
                                    details: 'No significant cyber threat activity or APT targeting reported in the 2024-2025 intelligence dataset.' 
                                });
                            }}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={d ? `${d.name}` : geo.properties.name}
                                                        style={{
                                                            default: {
                                                                fill: d ? (
                                                                    ['Aggressor', 'Nation State', 'Hub'].includes(d.type) ? '#ef4444' : // Red for Attackers
                                                                    ['Conflict Zone', 'Frontline'].includes(d.type) ? '#f97316' : // Orange for Conflict
                                                                    '#3b82f6' // Blue for Targets/High Risk
                                                                ) : "#1e293b", // Dark Slate for Low Activity
                                                                stroke: "#334155",
                                                                strokeWidth: 0.75,
                                                                outline: "none",
                                                                transition: "all 0.3s ease"
                                                            },
                                                            hover: {
                                                                fill: d ? "#cbd5e1" : "#475569", // Light grey on hover
                                                                stroke: "#cbd5e1",
                                                                strokeWidth: 1.5,
                                                                outline: "none",
                                                                cursor: "pointer"
                                                            },
                                                            pressed: {
                                                                fill: "#f8fafc",
                                                                outline: "none",
                                                            },
                                                        }}
                                                    />
                                                                            );
                                                                        })
                                                                        }
                                                                    </Geographies>
                                                                    </ZoomableGroup>
                                                                </ComposableMap>
                                                                <Tooltip id="my-tooltip" className="map-tooltip" />
                                                            </div>                                    
                                    {/* Legend Overlay */}
                                    <div className="map-legend-overlay">
                                        <div className="map-legend-item"><span className="red"></span> Aggressor / Source</div>
                                        <div className="map-legend-item"><span className="orange"></span> Conflict Zone</div>
                                        <div className="map-legend-item"><span className="blue"></span> Primary Target</div>
                                        <div className="map-legend-item"><span className="dark-slate"></span> Low Activity / No Data</div>
                                    </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div className="charts-metrics-grid">
        
        {/* CHART 1: RANSOMWARE */}
        <div className="cyber-card chart-card-col">
          <div className="chart-title-group">
            <h3 className="heading-card">Top Active Ransomware Groups</h3>
            <p className="chart-source">SOURCE: Ransomware Ransom Watch / CISA</p>
          </div>
          <div className="chart-area-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RANSOMWARE_DATA} layout="vertical" margin={{ left: 30, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={110} tick={{fill: '#e2e8f0'}} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.5rem' }}
                />
                <Bar dataKey="victims" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} name="Confirmed Victims" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: ATTACK VECTORS */}
        <div className="cyber-card chart-card-col">
            <div className="chart-title-group">
              <h3 className="heading-card">Primary Initial Access Vectors</h3>
              <p className="chart-source">SOURCE: Mandiant M-Trends 2024</p>
            </div>
            <div className="chart-area-container">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={VECTOR_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                        >
                            {VECTOR_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.5rem' }} />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#cbd5e1" fontSize="14" fontWeight="600">
                            2024-25
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="chart-legend-grid">
                {VECTOR_DATA.map((entry, index) => (
                    <div key={index} className="chart-legend-item">
                        <span className="color-dot" style={{ background: COLORS[index % COLORS.length] }}></span>
                        {entry.name} ({entry.value}%)
                    </div>
                ))}
            </div>
        </div>

      </div>

    </div>
  );
}