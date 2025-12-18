import { portfolioData } from '../../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="section-py">
      <div className="section-container">
        <h2 className="heading-section section-title-wrapper">
          <span>Side Projects</span>
        </h2>
        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                  <h3 className="heading-card">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
              </div>
              
              <p className="project-desc">
                {project.description}
              </p>
              
              <div className="project-tags">
                 {project.stack.map(tag => (
                     <span key={tag}>
                         {tag}
                     </span>
                 ))}
              </div>
              
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-cyber project-link">
                <span>{project.linkText}</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}