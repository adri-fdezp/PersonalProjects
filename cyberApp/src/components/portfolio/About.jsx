import { portfolioData } from '../../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="section-py">
      <div className="section-container">
        <h2 className="heading-section section-title-wrapper">
          <span>About Me</span>
        </h2>
        
        <div className="about-summary-card">
            <p>
            {portfolioData.about.summary}
            <br /><br />
            <span className="font-mono text-cyan-300">Languages:</span> {portfolioData.about.languages}
            </p>
        </div>

        <div className="about-grid">
          {/* Work Experience Column */}
          <div className="about-col-card">
            <h3>
                <span>&gt;</span> Work Experience
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {portfolioData.about.experience.map((job, index) => (
                  <div key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <h4>{job.role}</h4>
                      <p className="meta">{job.company} | {job.period}</p>
                      {job.tech && <p className="tech">{job.tech}</p>}
                      {job.points && (
                        <ul>
                          {job.points.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
            </div>
          </div>

          {/* Education & Skills Column */}
          <div className="about-col-card">
            <h3>
                <span>&gt;</span> Education
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {portfolioData.about.education.map((edu, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{edu.degree}</h4>
                      <p className="meta">{edu.school} | {edu.period}</p>
                      <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.875rem' }}>{edu.focus}</p>
                  </div>
                ))}
            </div>
            
            <div className="skills-container">
                 <h3>
                    <span>&gt;</span> Core Skills
                </h3>
                <div className="skills-list">
                    {portfolioData.about.skills.map(skill => (
                        <span key={skill} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}