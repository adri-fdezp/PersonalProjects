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
  { name: 'Vuln Exploitation', value: 33 },
  { name: 'Valid Accounts', value: 31 },
  { name: 'Phishing', value: 14 },
  { name: 'Ext Remote Svc', value: 12 },
  { name: 'Other', value: 10 },
];

const REGIONAL_MATURITY = [
  { subject: 'Cloud Sec', A: 120, B: 110, fullMark: 150 },
  { subject: 'Identity', A: 90, B: 120, fullMark: 150 }, // Adjusted for 2025 gaps
  { subject: 'Zero Trust', A: 86, B: 130, fullMark: 150 },
  { subject: 'Detection', A: 99, B: 100, fullMark: 150 },
  { subject: 'Response', A: 80, B: 85, fullMark: 150 }, // Lowered to reflect readiness gap
  { subject: 'Training', A: 65, B: 85, fullMark: 150 },
];

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(["#1e293b", "#ef4444"]);

export default function ThreatCharts() {
  const [tooltipContent, setTooltipContent] = useState("");
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
    <div className="charts-container" style={{ padding: '0 1rem 3rem 1rem', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#f8fafc', margin: 0, letterSpacing: '-0.025em' }}>
            Global Threat Operations Center
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Data Source: 2024-2025 Intelligence Reports (Mandiant, Verizon DBIR, Cyberint)</p>
        </div>
      </div>

      {/* INTERACTIVE MAP & DETAILS PANEL */}
      <div className="cyber-card" style={{ marginBottom: '3rem', height: '550px', display: 'flex', overflow: 'hidden', padding: 0, borderRadius: '0.75rem', border: '1px solid #334155', background: '#0f172a' }}>
        
        {/* LEFT SIDE PANEL */}
        <div style={{ width: '320px', flexShrink: 0, borderRight: '1px solid #334155', padding: '2rem', background: 'rgba(15, 23, 42, 0.6)', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <h3 className="heading-card" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700', color: '#f8fafc' }}>
                    Threat Intelligence
                </h3>
                {selectedCountry ? (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>📍</span>
                            <h4 style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>{selectedCountry.name}</h4>
                        </div>
                        
                                             <div style={{ marginBottom: '2rem', background: 'rgba(30, 41, 59, 0.5)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.05em', display: 'block', marginBottom: '0.25rem' }}>Cyber Risk Score</span>
                                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: colorScale(selectedCountry.risk), lineHeight: 1 }}>
                                                    {selectedCountry.risk}<span style={{ fontSize: '1rem', color: '#64748b', fontWeight: '600' }}>/100</span>
                                                </div>
                                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem', lineHeight: '1.4', borderTop: '1px solid #334155', paddingTop: '0.5rem' }}>
                                                    <strong>Risk Context:</strong> Composite index reflecting frequency of APT targeting, malware infection rates, and geopolitical exposure intensity.
                                                </p>
                                             </div>
                        
                                             <div style={{ marginBottom: '1.5rem' }}>
                                                <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Classification</span>
                                                <div style={{ color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '600' }}>{selectedCountry.type}</div>
                                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                                                    {selectedCountry.type === 'Aggressor' || selectedCountry.type === 'Nation State' ? 'Active source of offensive cyber operations.' : 
                                                     selectedCountry.type === 'Conflict Zone' ? 'Region experiencing active kinetic and cyber warfare.' :
                                                     'Primary destination for targeted cyber espionage or criminal campaigns.'}
                                                </p>
                                             </div>
                        <div>
                            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Key Threat Indicators</span>
                            <div style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.95rem' }}>{selectedCountry.details}</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', color: '#64748b', textAlign: 'center', marginTop: '2rem' }}>
                        <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🗺️</span>
                        <p>Select a country on the map to view its detailed cyber threat profile.</p>
                    </div>
                )}
            </div>
            
            {/* Source Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #334155', fontSize: '0.75rem', color: '#64748b' }}>
                <span style={{ fontWeight: '700' }}>Source:</span> Global Threat Intelligence Report 2025 (Mandiant, CrowdStrike)
            </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <div style={{ flex: 1, position: 'relative', background: '#0f172a' }}>
            <h3 className="heading-card" style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10, margin: 0, fontSize: '1rem', fontWeight: '700', background: 'rgba(15, 23, 42, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.5rem', backdropFilter: 'blur(4px)', border: '1px solid #334155', color: '#94a3b8' }}>
            Geopolitical Hotspots
            </h3>
            
            {/* Zoom Controls */}
            <div style={{ position: 'absolute', top: '5rem', left: '2rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={handleZoomIn} style={{ width: '2rem', height: '2rem', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>+</button>
                <button onClick={handleZoomOut} style={{ width: '2rem', height: '2rem', background: '#1e293b', border: '1px solid #334155', color: '#f8fafc', borderRadius: '0.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>−</button>
            </div>

            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
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
                        // Improved matching logic: Check ID, ISO_A3, Exact Name, and Partial Name
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
                                                                <Tooltip id="my-tooltip" style={{ backgroundColor: "rgba(15, 23, 42, 0.95)", border: "1px solid #334155", color: "#f8fafc", zIndex: 100, padding: "0.5rem 0.75rem", borderRadius: "0.5rem", fontSize: "0.8rem" }} />
                                                            </div>                                    
                                    {/* Legend Overlay */}
                                    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'rgba(15, 23, 42, 0.9)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155', fontSize: '0.75rem', color: '#cbd5e1' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}><span style={{ width: '10px', height: '10px', background: '#ef4444', marginRight: '0.75rem', borderRadius: '2px' }}></span> Aggressor / Source</div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}><span style={{ width: '10px', height: '10px', background: '#f97316', marginRight: '0.75rem', borderRadius: '2px' }}></span> Conflict Zone</div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}><span style={{ width: '10px', height: '10px', background: '#3b82f6', marginRight: '0.75rem', borderRadius: '2px' }}></span> Primary Target</div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ width: '10px', height: '10px', background: '#1e293b', border: '1px solid #475569', marginRight: '0.75rem', borderRadius: '2px' }}></span> Low Activity / No Data</div>
                                    </div>
        </div>
      </div>

      {/* METRICS GRID */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* CHART 1: RANSOMWARE */}
        <div className="cyber-card" style={{ flex: '1 1 250px', padding: '1.5rem', borderRadius: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid #334155', backdropFilter: 'blur(8px)' }}>
          <h3 className="heading-card" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700' }}>Top Active Ransomware Groups (2025)</h3>
          <div style={{ height: '200px', width: '100%', marginTop: '1rem' }}>
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
        <div className="cyber-card" style={{ flex: '1 1 250px', padding: '1.5rem', borderRadius: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid #334155', backdropFilter: 'blur(8px)' }}>
            <h3 className="heading-card" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700' }}>Primary Initial Access Vectors</h3>
            <div style={{ height: '200px', width: '100%', marginTop: '1rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={VECTOR_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {VECTOR_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', borderRadius: '0.5rem' }} />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#cbd5e1" fontSize="16" fontWeight="600">
                            2025
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', marginTop: '1.5rem' }}>
                {VECTOR_DATA.map((entry, index) => (
                    <span key={index} style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                        <span style={{ width: '10px', height: '10px', background: COLORS[index % COLORS.length], marginRight: '6px', borderRadius: '50%' }}></span>
                        {entry.name}
                    </span>
                ))}
            </div>
        </div>

      </div>

    </div>
  );
}