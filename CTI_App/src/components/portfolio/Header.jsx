import { portfolioData } from '../../data/portfolioData';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isPortfolio = location.pathname.startsWith('/portfolio');

  return (
    <header className="header-fixed">
      <nav className="header-container">
        <Link to="/portfolio" className="logo-link">
          &lt;{portfolioData.personal.shortName} /&gt;
        </Link>
        <div className="nav-links">
          {/* Internal Navigation (Only show if in portfolio) */}
          <a href="#about" className="btn-nav">About</a>
          <a href="#projects" className="btn-nav">Projects</a>
          <a href="#contact" className="btn-nav">Contact</a>

          {/* Cyber Tool Link */}
          <Link to="/" className="btn-nav btn-primary btn-cyber-tool">
            Cybersecurity Tools
          </Link>
        </div>
      </nav>
    </header>
  )
}