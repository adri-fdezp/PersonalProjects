import React, { useEffect, useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#f43f5e'];

export default function GlobalThreatContext() {
  const [cisaData, setCisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // FETCH REAL DATA FROM CISA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCisaData(data.vulnerabilities || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch CISA data:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // PROCESS DATA FOR CHARTS
  const chartsData = useMemo(() => {
    if (loading || error || cisaData.length === 0) return null;

    // 1. Top Vendors
    const vendorCounts = {};
    cisaData.forEach(vuln => {
      const vendor = vuln.vendorProject;
      vendorCounts[vendor] = (vendorCounts[vendor] || 0) + 1;
    });
    
    const topVendors = Object.entries(vendorCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7); // Top 7

    // 2. Timeline (by Month added)
    const timelineCounts = {};
    cisaData.forEach(vuln => {
      const date = new Date(vuln.dateAdded);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      timelineCounts[key] = (timelineCounts[key] || 0) + 1;
    });

    const timeline = Object.entries(timelineCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-12); // Last 12 months with activity

    // 3. Dynamic Attack Vector Categorization
    const vectorKeywords = {
      'RCE': ['remote code execution', 'rce', 'execute arbitrary code'],
      'Privilege Escalation': ['privilege escalation', 'gain privileges', 'escalate privileges'],
      'Injection': ['injection', 'sql', 'xss', 'cross-site scripting'],
      'DoS': ['denial of service', 'dos', 'crash'],
      'Overflow': ['overflow', 'memory corruption'],
      'Auth Bypass': ['bypass authentication', 'improper authentication', 'bypass access control']
    };

    const vectorCounts = {};
    
    cisaData.forEach(vuln => {
      const text = (vuln.shortDescription + " " + vuln.vulnerabilityName).toLowerCase();
      let matched = false;
      
      for (const [category, keywords] of Object.entries(vectorKeywords)) {
        if (keywords.some(k => text.includes(k))) {
          vectorCounts[category] = (vectorCounts[category] || 0) + 1;
          matched = true;
          break; // Count as first matched category
        }
      }
      
      if (!matched) {
        vectorCounts['Other'] = (vectorCounts['Other'] || 0) + 1;
      }
    });

    // Remove 'Other' to focus on specific types, or keep it if small
    // Let's filter top 5 non-Other for the chart
    const attackVectors = Object.entries(vectorCounts)
      .filter(([name]) => name !== 'Other')
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { topVendors, timeline, attackVectors };
  }, [cisaData, loading, error]);


  if (loading) {
    return (
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee', fontFamily: 'monospace'}}>
        [INITIALIZING REAL-TIME DATA STREAM...]
      </div>
    );
  }

  if (error || !chartsData) {
    return (
        <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontFamily: 'monospace', flexDirection: 'column'}}>
            <p>[CONNECTION FAILURE]</p>
            <p style={{fontSize: '0.8rem', opacity: 0.7}}>Unable to retrieve CISA Catalog data.</p>
        </div>
    );
  }

  const { topVendors, timeline, attackVectors } = chartsData;

  return (
    <div className="tool-view-container" style={{paddingBottom: '1rem'}}>
      {/* HEADER INFO */}
      <div className="section-header" style={{marginBottom: '1rem', border: 'none'}}>
        <div className="source-link" style={{width: '100%'}}>
             <h3 style={{fontSize: '0.875rem', color: '#22d3ee', fontFamily: 'monospace', textAlign: 'left', marginBottom: 0}}>
                DATA SOURCE: CISA KNOWN EXPLOITED VULNERABILITIES CATALOG
             </h3>
             <span style={{fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace', display: 'flex', alignItems: 'center'}}>● LIVE CONNECTED</span>
        </div>
      </div>

      <div className="metrics-grid" style={{gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, auto)'}}>
        
        {/* CHART 1: TOP VENDORS (Bar Chart) */}
        <div className="chart-card">
          <h4>
            <span className="dot"></span>
            Top Exploited Vendors (Historical)
          </h4>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topVendors} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={10} />
                <YAxis dataKey="name" type="category" width={90} stroke="#94a3b8" fontSize={11} tick={{fill: '#cbd5e1'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', fontSize: '12px' }}
                  cursor={{fill: '#1e293b'}}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: GLOBAL ATTACK PREVALENCE (Pie Chart - Derived) */}
        <div className="chart-card">
          <h4>
             <span className="dot" style={{backgroundColor: '#8b5cf6'}}></span>
            Prevalent Vulnerability Types (Derived)
          </h4>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attackVectors}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attackVectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', fontSize: '12px' }}
                />
                <Legend iconType="circle" fontSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: '11px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: VULNERABILITY TIMELINE (Area Chart - Full Width) */}
        <div className="chart-card col-span-2">
          <h4>
            <span className="dot" style={{backgroundColor: '#ef4444'}}></span>
            New Exploits Added to Catalog (Last 12 Months)
          </h4>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" name="New Exploits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
